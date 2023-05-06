export default class FormValidator {

  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._element = formElement;
  };

  enableValidation() {
    this._setEventListener();

    this._element.addEventListener('submit', () => {
      this._setEventListener();
    })
  };

  _setEventListener() {
    const _inputs = Array.from(this._element.querySelectorAll(this._inputSelector));

    this._toggleButton(_inputs);

    _inputs.forEach((input) => {
      input.addEventListener('input', () => {

        this._checkValidity(input);

        this._toggleButton(_inputs);
  
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

  _toggleButton(_inputs) {
    const _button = this._element.querySelector(this._submitButtonSelector);

    if (!this._areAllInputsValid(_inputs)) {

      this._disabledButton(_button);
    
    } else {

      this._enabledButton(_button);

    };
  };

  _areAllInputsValid(_inputs) {
    return _inputs.every((_inputs) => {
      return _inputs.validity.valid;
    });
  };

  _enabledButton(_button) {
    _button.classList.remove(this._inactiveButtonClass);
    _button.removeAttribute('disabled');
  };

  _disabledButton(_button) {
    _button.classList.add(this._inactiveButtonClass);
    _button.setAttribute('disabled', '');
  }
};