export default class Card {
  
  constructor(name, link, likes, userId, cardId, profileId, openPopupImg, template, createNewPopupConfirm, putLike, deleteLike) {
    this._text = name;
    this._img = link;
    this._likes = likes;
    this._userId = userId;
    this._cardId = cardId;
    this._profileId = profileId;
    this._openPopupImg = openPopupImg;
    this._template = template;
    this._createNewPopupConfirm = createNewPopupConfirm;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
  };

  _getTemplate() {
    const elementsTemplate = document.querySelector(this._template).content;
    const cardElement = elementsTemplate.querySelector('.element').cloneNode(true);

    return cardElement;
  };

  _toggleTrashButton(element) {
    if (this._userId !== this._profileId) {
      element.querySelector('.element__trash').remove();
    }
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.element__img');

    this._setEventListener();
    this._toggleTrashButton(this._element);

    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__like').textContent = this._renderLikes();
    this._elementImg.src = this._img;
    this._elementImg.alt = `Фотография: ${this._text}`;

    return this._element;
  };

  _checkLike() {
    return this._likes.some((item) => item._id === this._profileId);
  };

  _renderLikes() {
    let likes = 0;
    if (this._likes.length > 0) {
      if (this._checkLike()) {
        this._element.querySelector('.element__button').classList.add('element__button_type_active');
      }
      return likes = this._likes.length;
    } else {
      return '';
    }
  };

  _setEventListener() {

    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._toggleClassLike();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._removeElement();
    });

    this._element.querySelector('.element__img').addEventListener('click', (evt) => {
      this._openPopupImg(evt);
    });
  };

  _toggleClassLike() {
    if (this._element.querySelector('.element__button').classList.contains('element__button_type_active')) {
      this._deleteLike(this._element, this._cardId);
    } else {
      this._putLike(this._element, this._cardId);
    }
  };

  _removeElement() {
    this._createNewPopupConfirm(this._element, this._cardId);
  };
};