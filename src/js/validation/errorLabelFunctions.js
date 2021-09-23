import { removeElement } from "./helpers";

/**
 * @param {Element} element
 * @param {string} message
 * @returns {Element}
 */
export function createErrorLabel(element, message) {
  var elementId = element.getAttribute('id');
  var label = document.createElement('label');
  label.classList.add('errormessage');
  label.setAttribute('for', elementId);
  label.innerText = message;

  var button = document.querySelector('.buttonGreenLocked');

  if (button) {
    button.classList.remove('is-locked');
  }

  return label;
}

/**
 * @syntax addErrorLabel(element, messageLabel)
 * @param {Element} element, the element that is validated
 * @param {Element} messageLabel, the error message element
 */
export function addErrorLabel(element, messageLabel) {
  var label = element.parentNode.parentNode;
  var id = element.getAttribute('id');

  // An Error label is added so first we remove the succesMessage.
  var messageElement = label.querySelector('.successmessage');
  if (messageElement) {
    removeElement(messageElement);
  }
  element.classList.remove('valid');
  element.classList.add('invalid')

  var existingErrorMessage = label.querySelector(`label.errormessage[for="${id}"]`);

  if (existingErrorMessage) {
    existingErrorMessage.replaceWith(messageLabel);
  } else {
    label.appendChild(messageLabel);
  }
}
