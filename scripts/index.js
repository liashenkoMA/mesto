let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupCloseButton = popup.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let popupNameAdd = popup.querySelector('.popup__input_type_title');
let popupDescriptionAdd = popup.querySelector('.popup__input_type_description');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupNameAdd.setAttribute('value', profileName.textContent);
  popupDescriptionAdd.setAttribute('value', profileDescription.textContent);
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

function saveInfoPopup(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameAdd.value;
    profileDescription.textContent = popupDescriptionAdd.value;
    popupClose();
};

editProfileButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', saveInfoPopup);