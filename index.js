let editProfileButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__button-close')

let profileName = document.querySelector('.profile__title')
let profileDescription = document.querySelector('.profile__description')
let popupNameAdd = document.querySelector('.popup__input_type_title')
let popupDescriptionAdd = document.querySelector('.popup__input_type_description')
let popupSaveButton = document.querySelector('.popup__button_save')

function popupOpen() {
  popup.classList.add('popup__opened');
};

function popupClose() {
  popup.classList.remove('popup__opened');
};

function saveInfoPopup() {
  if (popupNameAdd.value.length === 0 && popupDescriptionAdd.value.length === 0) {
    popupClose()
  } else {
    profileName.textContent = popupNameAdd.value;
    profileDescription.textContent = popupDescriptionAdd.value;
    popupClose()
  }
};

editProfileButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupSaveButton.addEventListener('click', saveInfoPopup);