export const options = {
  cohort: 'cohort-68',
  key: 'f1605107-de74-4364-b9cb-272c1e5a2dd9',
}

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const editProfileButton = document.querySelector('.profile__edit-button');
export const elementAddButton = document.querySelector('.profile__button');
export const avatarProfileButton = document.querySelector('.profile__edit-avatar-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupNameAdd = popupEditProfile.querySelector('.popup__input_type_title');
export const popupDescriptionAdd = popupEditProfile.querySelector('.popup__input_type_description');
export const popupAddElement = document.querySelector('.popup_type_add-element');
export const profileAvatar = document.querySelector('.profile__avatar');