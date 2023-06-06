import PopupWithForm from "./Popup";

export default class PopupWithConfirmation extends PopupWithForm {

  constructor(selector, deleteCard, id, element) {
    super(selector)

    this._id = id;
    this._element = element;
    this._popupForm = this._popup.querySelector('.popup__form')
    this._deleteCard = deleteCard;
  }

  setEventListener() {
    super.setEventListener();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._element.remove()
      this._deleteCard(this._id);
      super.close();
    })
  };
};