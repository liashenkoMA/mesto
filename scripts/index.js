import {initialCards, config} from './constants.js';
import {disabledButton} from './validate.js';

const elementContainer = document.querySelector('.elements');
const editProfileButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupSaveEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupCloseEditProfileButton = popupEditProfile.querySelector('.popup__button-close');
const popupNameAdd = popupEditProfile.querySelector('.popup__input_type_title');
const popupDescriptionAdd = popupEditProfile.querySelector('.popup__input_type_description');

const popupAddElement = document.querySelector('.popup_type_add-element');
const popupSaveElementForm = popupAddElement.querySelector('.popup__form');
const popupCloseAddElementButton = popupAddElement.querySelector('.popup__button-close');

const popupOpenImages = document.querySelector('.popup_type_images-open');
const popupImages = popupOpenImages.querySelector('.popup__image');
const popupDescription = popupOpenImages.querySelector('.popup__description');
const popupImagesCloseButton = popupOpenImages.querySelector('.popup__button-close');


const popupInputPlaceName = document.querySelector('.popup__input_type_place-name');
const popupInputUrl = document.querySelector('.popup__input_type_image-link');

/* function */

function renderCards (items) {
  for (let i = 0; i < items.length; i++) {
    addElement(items[i].name, items[i].link);
  }
};


renderCards(initialCards);


function saveInfoPopup(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameAdd.value;
    profileDescription.textContent = popupDescriptionAdd.value;

    closePopup(popupEditProfile);

};


function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');

    closePopup(popupOpened);

  }
};


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupEsc);
};


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupEsc);
};


function createCard(name, link) {
  const elementsTemplate = document.querySelector('#element-template').content;
  const cardElement = elementsTemplate.querySelector('.element').cloneNode(true);
  const cardElementText = cardElement.querySelector('.element__title');
  const cardElementImg = cardElement.querySelector('.element__img');

  cardElementText.textContent = name;
  cardElementImg.src = link;
  cardElementImg.alt = `Фотография: ${name}`;


  cardElement.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_type_active');
  });


  cardElement.querySelector('.element__trash').addEventListener('click', function () {
    cardElement.remove()
  });
  

  cardElementImg.addEventListener('click', function(evt) {

    openPopup(popupOpenImages);

    popupImages.setAttribute('src', evt.target.getAttribute('src'));
    popupImages.setAttribute('alt', `Фотография: ${cardElement.innerText}`);
    popupDescription.textContent = cardElement.innerText;
  });

  return cardElement;
};


function addElement(name, link) {
  const element = createCard(name, link)
  elementContainer.prepend(element);
};

/* addEventListener */

editProfileButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  popupNameAdd.setAttribute('value', profileName.textContent);
  popupDescriptionAdd.setAttribute('value', profileDescription.textContent);
});
popupCloseEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
popupSaveEditProfileForm.addEventListener('submit', saveInfoPopup);

elementAddButton.addEventListener('click', () => openPopup(popupAddElement));
popupCloseAddElementButton.addEventListener('click', () => closePopup(popupAddElement));
popupSaveElementForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  
  const name = popupInputPlaceName.value;
  const link = popupInputUrl.value;

  addElement(name, link)
  closePopup(popupAddElement)

  
  evt.target.reset();
  const button = popupAddElement.querySelector('.popup__button');
  disabledButton(button, config);
});

popupImagesCloseButton.addEventListener('click', () => closePopup(popupOpenImages));


function initClosePopupsByOverlay() {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popupElement) => {
    popupElement.addEventListener('click', function(evt) {
      if (evt.currentTarget === popupElement) {
        closePopup(evt.target)
      }
    });
  });
}

initClosePopupsByOverlay()