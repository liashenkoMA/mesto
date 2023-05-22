import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  
  constructor(selector) {
    super(selector);

    this._popupImages = this._popup.querySelector('.popup__image');
    this._popupDescription = this._popup.querySelector('.popup__description');
  };

  open(evt) {
    super.open();

    this._popupImages.setAttribute('src', evt.target.getAttribute('src'));
    this._popupImages.setAttribute('alt', `Фотография: ${evt.target.nextElementSibling.innerText}`);
    this._popupDescription.textContent = evt.target.nextElementSibling.innerText;
  };

}