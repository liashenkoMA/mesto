import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {options,
        config,
        editProfileButton,
        elementAddButton,
        popupEditProfile,
        popupEditAvatar,
        avatarProfileButton,
        popupNameAdd,
        popupDescriptionAdd,
        popupAddElement,
        profileAvatar,
        } from '../utils/constants.js';

/* Function */

const popupImage = new PopupWithImage('.popup_type_images-open');
popupImage.setEventListener();

const cardList = new Section({renderer: (item) => {
  cardList.addItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, openPopupImg, createNewPopupConfirm));
}}, '.elements');

function openPopupImg (evt) {
  popupImage.open(evt);
};

function saveElementForm(items) {
  const name = items[`input-place-name`];
  const link = items[`input-image-link`];
  const likes = 0;
  
  cardList.addItem(createCard(name, link, likes, 'a6d1a089272270f220b3fd75', 'a6d1a089272270f220b3fd75', openPopupImg, createNewPopupConfirm));
  api.postNewCard(name, link);
  validationPopupAddElement.disabledButton();
  popupElement.close();
};

function saveInfoPopup(items) {
  api.patchUserInfo(items[`name`], items[`about`]);
  userInfo.setUserInfo(items);
  popupProfil.close();
};

function createCard(name, link, likes, id, itemId, openPopupImg, createNewPopupConfirm) {
  const card = new Card(name, link, likes, id, itemId, openPopupImg, '#element-template', createNewPopupConfirm, putLike, deleteLike);
  const cardElement = card.generateCard();
  return cardElement;
};

function saveAvatar(link) {
  profileAvatar.src = link;
};

function publickCard(items) {
  cardList.renderItems(items);
};

function createNewPopupConfirm(element, id) {
  const popupConfirm = new PopupWithConfirmation('.popup_type_delete-element', deleteCard, id, element);
  popupConfirm.setEventListener();
  popupConfirm.open();
};

function deleteCard(id) {
  api.deleteCard(id);
};

function putLike(id) {
  api.putLike(id);
};

function deleteLike(id) {
  api.deleteLike(id);
};

function changeAvatar(links) {
  profileAvatar.src = links[`input-avatar-link`];
  api.patchAvatar(links[`input-avatar-link`]);
  popupAvatar.close();
};

function loading(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    document.querySelector('.popup__button').textContent = 'Сохранить';
  };
};

/* Validation */

const validationPopupEditProfile = new FormValidator(config, popupEditProfile);
validationPopupEditProfile.enableValidation();

const validationPopupAddElement = new FormValidator(config, popupAddElement);
validationPopupAddElement.enableValidation();

const validationPopupEditAvatar = new FormValidator(config, popupEditAvatar);
validationPopupEditAvatar.enableValidation();

/* Popup */

const popupProfil = new PopupWithForm('.popup_type_edit-profile', saveInfoPopup, loading);
popupProfil.setEventListener();

const popupElement = new PopupWithForm('.popup_type_add-element', saveElementForm, loading);
popupElement.setEventListener();

const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', changeAvatar, loading);
popupAvatar.setEventListener()

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

avatarProfileButton.addEventListener('click', () => {
  popupAvatar.open()
});

/* API */

const api = new Api(options, loading);

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  saveAvatar(res.avatar);
}).catch((err) => {
  console.log(err);
});

api.getInitialCards()
  .then((results) => {
    publickCard(results);
}).catch((err) => {
  console.log(err);
});