import PopupWithForm from "./Popup";

export default class PopupWithConfirmation extends PopupWithForm {

  constructor(selector, deleteCard) {
    super(selector)

    this._popupForm = this._popup.querySelector('.popup__form')
    this._deleteCard = deleteCard;
    this._element = null;
    this._id = null;
  }

  open(element, id) {
    super.open();

    this._id = id;
    this._element = element;
  }

  setEventListener() {
    super.setEventListener();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      
      this._deleteCard(this._element, this._id);
      super.close();
    })
  };
};