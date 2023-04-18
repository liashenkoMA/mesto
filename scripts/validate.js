import {config} from './constants.js';

function areAllInputsValid (inputs) {
  return inputs.every((inputs) => {
    return inputs.validity.valid;
  })
};


function enabledButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.removeAttribute('disabled');
}

export function disabledButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', '');
}


function toggleButton(formElement, inputs, config) {
  const button = formElement.querySelector(config.submitButtonSelector);

  if (!areAllInputsValid(inputs)) {

    disabledButton(button, config)
  
  } else {

    enabledButton(button, config)

  }
};


function showError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass)
  errorElement.textContent = input.validationMessage;
};


function hideError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass)
  errorElement.textContent = '';
};


function checkValidity(formElement, input, config) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);

  if (input.checkValidity()) {

    hideError(input, errorElement, config)

  } else {

    showError(input, errorElement, config)

  }

};


function setEventListener(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));

  toggleButton(formElement, inputs, config);

  inputs.forEach(function(input) {
    input.addEventListener('input', function () {

      checkValidity(formElement, input, config);

      toggleButton(formElement, inputs, config);

    })
  });
}


function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });

    setEventListener(formElement, config);

  });
  
};

enableValidation(config);