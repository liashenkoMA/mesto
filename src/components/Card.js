export default class Card {
  
  constructor(name, link, openPopupImg, template) {
    this._text = name;
    this._img = link;
    this._openPopupImg = openPopupImg;
    this._template = template;
  };

  _getTemplate() {
    const elementsTemplate = document.querySelector(this._template).content;
    const cardElement = elementsTemplate.querySelector('.element').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.element__img');

    this._setEventListener();

    this._element.querySelector('.element__title').textContent = this._text;
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
    this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
  };

  _removeElement() {
    this._element.remove();
  };
};