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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function openPages (item) {
  for (let i = 0; i < item.length; i++) {
    addElement(item[i].name, item[i].link);
  }
}

openPages(initialCards);

/* Edit profile */

function popupEditProfileOpen() {
  popupEditProfile.classList.add('popup_opened');
  popupNameAdd.setAttribute('value', profileName.textContent);
  popupDescriptionAdd.setAttribute('value', profileDescription.textContent);
};


function popupEditProfileClose() {
  popupEditProfile.classList.remove('popup_opened');
};


function saveInfoPopup(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameAdd.value;
    profileDescription.textContent = popupDescriptionAdd.value;
    popupEditProfileClose();
};


editProfileButton.addEventListener('click', popupEditProfileOpen);
popupCloseEditProfileButton.addEventListener('click', popupEditProfileClose);
popupSaveEditProfileForm.addEventListener('submit', saveInfoPopup);

/* Element */

function popupOpened(evt) {
  evt.classList.toggle('popup_opened');
};


function addElement(name, link) {
  
  const elementsTemplate = document.querySelector('#element-template').content;
  const element = elementsTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__img').src = link;

  element.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_type_active');
  });

  element.querySelector('.element__trash').addEventListener('click', function () {
    element.remove()
  });
  
  element.querySelector('.element__img').addEventListener('click', function(evt) {
    popupOpened(popupOpenImages);
    popupImages.setAttribute('src', evt.target.getAttribute('src'));
    popupDescription.textContent = element.innerText;
  });

  elementContainer.prepend(element);
}


elementAddButton.addEventListener('click', () => popupOpened(popupAddElement));
popupCloseAddElementButton.addEventListener('click', () => popupOpened(popupAddElement));
popupSaveElementForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = document.querySelector('.popup__input_type_place-name').value;
  const link = document.querySelector('.popup__input_type_image-link').value;

  addElement(name, link)
  popupOpened(popupAddElement)
});
popupImagesCloseButton.addEventListener('click', () => popupOpened(popupOpenImages));