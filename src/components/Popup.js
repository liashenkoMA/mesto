export default class Popup {
  
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscCloseBind = this._handleEscClose.bind(this)
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.body.addEventListener('keydown', this._handleEscCloseBind);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.body.removeEventListener('keydown', this._handleEscCloseBind);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {

      this.close();
  
    }
  };

  setEventListener() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {

        this.close();
        
      }
    })
  };
}