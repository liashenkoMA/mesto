import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards,
        config,
        editProfileButton,
        elementAddButton,
        popupEditProfile,
        popupNameAdd,
        popupDescriptionAdd,
        popupAddElement,
        } from '../utils/constants.js';

/* Function */

const popupImage = new PopupWithImage('.popup_type_images-open');
popupImage.setEventListener();

function openPopupImg (evt) {
  popupImage.open(evt);
}

function saveElementForm() {
  const name = popupElement.getInputValues()[`input-place-name`];
  const link = popupElement.getInputValues()[`input-image-link`];

  cardsList.addItem(createCard(name, link, openPopupImg));
  validationPopupAddElement.disabledButton();
  popupElement.close();
}

function saveInfoPopup() {
  userInfo.setUserInfo(popupProfil.getInputValues());
  popupProfil.close();
}

function createCard(name, link, openPopupImg) {
  const card = new Card(name, link, openPopupImg, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
};

/* Section */

  const cardsList = new Section({items: initialCards, renderer: (item) => {
    cardsList.addItem(createCard(item.name, item.link, openPopupImg));
  }}, '.elements');

  cardsList.renderItems();

/* Validation */

const validationPopupEditProfile = new FormValidator(config, popupEditProfile);
validationPopupEditProfile.enableValidation();

const validationPopupAddElement = new FormValidator(config, popupAddElement);
validationPopupAddElement.enableValidation();

/* Popup */

const popupProfil = new PopupWithForm('.popup_type_edit-profile', saveInfoPopup);
popupProfil.setEventListener();

const popupElement = new PopupWithForm('.popup_type_add-element', saveElementForm);
popupElement.setEventListener();

const userInfo = new UserInfo('.profile__title', '.profile__description');

/* EventListener */

elementAddButton.addEventListener('click', () => {
  popupElement.open();
});

editProfileButton.addEventListener('click', () => {
  popupProfil.open();
  popupNameAdd.value = userInfo.getUserInfo().popupName;
  popupDescriptionAdd.value = userInfo.getUserInfo().popupDescription;
});