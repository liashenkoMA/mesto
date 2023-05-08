export default class FormValidator {

  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;
    this._button = this._element.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(this._element.querySelectorAll(this._inputSelector));
  };

  enableValidation() {
    this._setEventListener();

    this._element.addEventListener('submit', () => {
      this._setEventListener();
    })
  };

  _setEventListener() {

    this._toggleButton();

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {

        this._checkValidity(input);

        this._toggleButton();
  
      })
    });
  };

  _checkValidity(input) {
    const _errorElement = this._element.querySelector(`.${input.id}-error`);

    if (input.checkValidity()) {
  
      this._hideError(input, _errorElement)
  
    } else {
  
      this._showError(input, _errorElement)
  
    }
  };

  _hideError(input, _errorElement) {
    input.classList.remove(this._inputErrorClass)
    _errorElement.textContent = '';
  };

  _showError(input, _errorElement) {
    input.classList.add(this._inputErrorClass)
    _errorElement.textContent = input.validationMessage;
  };

  _toggleButton() {
    if (!this._areAllInputsValid()) {

      this.disabledButton();
    
    } else {

      this._enabledButton();

    };
  };

  _areAllInputsValid() {
    return this._inputs.every((input) => {
      return input.validity.valid;
    });
  };

  _enabledButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  };

  disabledButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', '');
  }
};