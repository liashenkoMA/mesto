import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, config} from './constants.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const elementAddButton = document.querySelector('.profile__button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNameAdd = popupEditProfile.querySelector('.popup__input_type_title');
const popupDescriptionAdd = popupEditProfile.querySelector('.popup__input_type_description');
const popupCloseEditProfileButton = popupEditProfile.querySelector('.popup__button-close');
const popupSaveEditProfileForm = popupEditProfile.querySelector('.popup__form');

const popupAddElement = document.querySelector('.popup_type_add-element');
const popupCloseAddElementButton = popupAddElement.querySelector('.popup__button-close');
const popupSaveElementForm = popupAddElement.querySelector('.popup__form');

const popupInputPlaceName = document.querySelector('.popup__input_type_place-name');
const popupInputUrl = document.querySelector('.popup__input_type_image-link');

const popupOpenImages = document.querySelector('.popup_type_images-open');
const popupImages = popupOpenImages.querySelector('.popup__image');
const popupDescription = popupOpenImages.querySelector('.popup__description');
const popupImagesCloseButton = popupOpenImages.querySelector('.popup__button-close');


function openPopupImg (evt) {
  openPopup(popupOpenImages);

  popupImages.setAttribute('src', evt.target.getAttribute('src'));
  popupImages.setAttribute('alt', `Фотография: ${evt.target.nextElementSibling.innerText}`);
  popupDescription.textContent = evt.target.nextElementSibling.innerText;
}


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


function initClosePopupsByOverlay() {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popupElement) => {
    popupElement.addEventListener('click', function(evt) {
      if (evt.currentTarget === popupElement) {
        closePopup(evt.target)
      }
    });
  });
};


function saveNewElement(name, link, openPopupImg, templateElement) {

  const card = new Card(name, link, openPopupImg, templateElement);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);

};


/* Создаем карточки из файла constant */
initialCards.forEach((item) => {
  saveNewElement(item.name, item.link, openPopupImg, '#element-template');
});


/* Валидация форм */
const validationPopupEditProfile = new FormValidator(config, popupEditProfile);
validationPopupEditProfile.enableValidation();

const validationPopupAddElement = new FormValidator(config, popupAddElement);
validationPopupAddElement.enableValidation();


/* Слушатели событий */
editProfileButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  popupNameAdd.value = profileName.textContent;
  popupDescriptionAdd.value = profileDescription.textContent;
});
popupCloseEditProfileButton.addEventListener('click', () => closePopup(popupEditProfile));
popupSaveEditProfileForm.addEventListener('submit', saveInfoPopup);

elementAddButton.addEventListener('click', () => openPopup(popupAddElement));
popupCloseAddElementButton.addEventListener('click', () => closePopup(popupAddElement));


popupSaveElementForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  
  const name = popupInputPlaceName.value;
  const link = popupInputUrl.value;

  saveNewElement(name, link, openPopupImg, '#element-template');

  validationPopupAddElement.disabledButton();

  closePopup(popupAddElement);
  evt.target.reset();
});

popupImagesCloseButton.addEventListener('click', () => closePopup(popupOpenImages));
initClosePopupsByOverlay();