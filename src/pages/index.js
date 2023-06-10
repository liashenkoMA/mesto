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

const cardList = new Section({renderer: (userInfo, item) => {
  cardList.addItem(createCard(item.name, item.link, item.likes, item.owner._id, item._id, userInfo._id, openPopupImg, createNewPopupConfirm, putLike, deleteLike));
}}, '.elements');

function openPopupImg (evt) {
  popupImage.open(evt);
};

function saveElementForm(items) {
  const name = items[`input-place-name`];
  const link = items[`input-image-link`];
  const myProfileId = "a6d1a089272270f220b3fd75";
    
  api.postNewCard(name, link)
  .then((res) => {
    console.log(res)
    cardList.addItem(createCard(res.name, res.link, res.likes, res.owner._id, res._id, res.owner._id, openPopupImg, createNewPopupConfirm, putLike, deleteLike));
    validationPopupAddElement.disabledButton();
    popupElement.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false);
  });
};

function saveInfoPopup(items) {
  api.patchUserInfo(items[`name`], items[`about`]).then(() => {
    userInfo.setUserInfo(items);
    popupProfil.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false);
  });
};

function createCard(name, link, likes, userId, cardId, profileId, openPopupImg, createNewPopupConfirm) {
  const card = new Card(name, link, likes, userId, cardId, profileId, openPopupImg, '#element-template', createNewPopupConfirm, putLike, deleteLike);
  const cardElement = card.generateCard();
  return cardElement;
};

function saveAvatar(link) {
  profileAvatar.src = link;
};

function publickCard(userInfo, items) {
  cardList.renderItems(userInfo, items);
};

function createNewPopupConfirm(element, id) {
  popupConfirm.open(element, id);
};

function deleteCard(element, id) {
  api.deleteCard(id).then(() => {
    element.remove();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false);
  });
};

function putLike(element, id) {
  api.putLike(id)
  .then((res) => {
    element.querySelector('.element__button').classList.add('element__button_type_active');
    element.querySelector('.element__like').textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
};

function deleteLike(element, id) {
  api.deleteLike(id)
  .then((res) => {
    element.querySelector('.element__button').classList.remove('element__button_type_active');
    if(res.likes.length > 0) {
      element.querySelector('.element__like').textContent = res.likes.length;
    } else {
      element.querySelector('.element__like').textContent = '';
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

function changeAvatar(links) {
  api.patchAvatar(links[`input-avatar-link`])
  .then(() => {
    profileAvatar.src = links[`input-avatar-link`];
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false);
  });
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

const userInfo = new UserInfo('.profile__title', '.profile__description', saveAvatar);

const popupConfirm = new PopupWithConfirmation('.popup_type_delete-element', deleteCard);
popupConfirm.setEventListener();

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

const api = new Api(options);

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((res) => {
  userInfo.setUserInfo(res[0]);
  saveAvatar(res[0].avatar);
  publickCard(res[0], res[1]);
})
.catch((err) => {
  console.log(err)
});