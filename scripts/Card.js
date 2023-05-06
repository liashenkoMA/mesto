export default class Card {
  
  constructor(name, link, openPopupImg) {
    this._text = name;
    this._img = link;
    this._openPopupImg = openPopupImg;
  };

  _getTemplate() {
    const elementsTemplate = document.querySelector('#element-template').content;
    const cardElement = elementsTemplate.querySelector('.element').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListener();

    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector('.element__img').src = this._img;

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
    this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
  };

  _removeElement() {
    this._element.remove();
  };
};