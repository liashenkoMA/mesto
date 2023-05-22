import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(selector, submitsForm) {
    super(selector);

    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitsForm = submitsForm;
  };

  getInputValues() {
    const inputs = Array.from(this._popup.querySelectorAll('.popup__input'));

    return inputs.reduce((total, item) => {
      total[item.id] = item.value;
      return total;
    }, {});
    
  };

  setEventListener() {
    super.setEventListener();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitsForm();
    })
  };

  close() {
    super.close();

    this._popupForm.reset();
  };
};