import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  
  constructor(selector) {
    super(selector);

    this._popupImages = this._popup.querySelector('.popup__image');
    this._popupDescription = this._popup.querySelector('.popup__description');
  };

  open(evt) {
    super.open();
    
    const text = evt.target.nextElementSibling.querySelector('.element__title').textContent;

    this._popupImages.setAttribute('src', evt.target.getAttribute('src'));
    this._popupImages.setAttribute('alt', `Фотография: ${text}`);
    this._popupDescription.textContent = text;
  };

}