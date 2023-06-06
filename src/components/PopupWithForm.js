import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(selector, submitsForm, loading) {
    super(selector);

    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitsForm = submitsForm;
    this._loading = loading;
  };

  _getInputValues() {
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
      
      this._loading(true);
      this._submitsForm(this._getInputValues());
    })
  };

  close() {
    super.close();

    this._popupForm.reset();
  };
};