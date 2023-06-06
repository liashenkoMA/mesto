export default class Card {
  
  constructor(name, link, likes, id, itemId, openPopupImg, template, createNewPopupConfirm, putLike, deleteLike) {
    this._text = name;
    this._img = link;
    this._likes = likes;
    this._id = id;
    this._itemId = itemId;
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
    if (this._id !== 'a6d1a089272270f220b3fd75') {
      element.querySelector('.element__trash').remove();
    }
  };

  _checkLikes() {
    let likes = 0;
    if (this._likes.length > 0) {
      return likes = this._likes.length;
    } else {
      return '';
    }
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.element__img');

    this._setEventListener();
    this._toggleTrashButton(this._element);

    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__like').textContent = this._checkLikes();
    this._elementImg.src = this._img;
    this._elementImg.alt = `Фотография: ${this._text}`;

    return this._element;
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
    if(!this._element.querySelector('.element__button').classList.contains('element__button_type_active')) {
      this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
      this._element.querySelector('.element__like').textContent = this._checkLikes() + 1;
      this._putLike(this._itemId);
    } else {
      this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
      this._element.querySelector('.element__like').textContent = this._checkLikes();
      this._deleteLike(this._itemId);
    }
  };

  _removeElement() {
    this._createNewPopupConfirm(this._element, this._itemId);
  };
};