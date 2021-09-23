import { createErrorLabel, addErrorLabel } from './errorLabelFunctions';
import addSuccessLabel from './successLabelFunctions';
import {
  VALIDATION_ERRORCODE_NOT_EMPTY, VALIDATION_ERRORCODE_TOO_LONG,
  VALIDATION_ERRORCODE_TOO_SHORT, VALIDATION_ERRORCODE_INVALID_FORMAT
} from './constants';
import { isVisible, queryAll, removeElement } from "./helpers";

/**
 *
 * @param {Element} element
 * @param {Object} [jsonMessages]
 * @returns {string}
 */
export default function inputValidation(element, jsonMessages) {
  /*
   *  elementName: If the name is not found, obtain the name using the ID as fallback.
   */
  var elementName = element.getAttribute('name') || element.getAttribute('id');
  var value = element.value;
  var trimmedValue = value.trim();
  var required = element.required;
  var maxLength = element.getAttribute('maxlength');
  var minLength = element.getAttribute('minlength');
  var patternString = element.getAttribute('pattern');
  var pattern;
  var isValidated = false;
  var errorMessage = '';
  var errorLabel = '';
  var id = element.getAttribute('id');
  var type = element.getAttribute('type');
  var errorMessages = jsonMessages || {};

  /**
   * @param {string} errorType
   * @returns {string|undefined}
   */
  function getErrorMessage(errorType) {
    var messageField = errorMessages[elementName] || {};

    return messageField[errorType];
  }

  if (isVisible(element) === true &&
    element.disabled === false) {

    if (required !== undefined) {
      isValidated = true;

      if (trimmedValue.length <= 0) {
        errorMessage = getErrorMessage(VALIDATION_ERRORCODE_NOT_EMPTY);
        errorLabel = createErrorLabel(element, errorMessage);
      }
    }

    if (maxLength && errorMessage === '') {
      isValidated = true;

      if (trimmedValue.length > maxLength) {
        errorMessage = getErrorMessage(VALIDATION_ERRORCODE_TOO_LONG);
        errorLabel = createErrorLabel(element, errorMessage);
      }
    }

    if (minLength && errorMessage === '') {
      isValidated = true;

      if (minLength > trimmedValue.length && trimmedValue.length > 0) {
        errorMessage = getErrorMessage(VALIDATION_ERRORCODE_TOO_SHORT);
        errorLabel = createErrorLabel(element, errorMessage);
      } else if (trimmedValue.length === 0) {
        isValidated = false;
      }
    }

    if (patternString && errorMessage === '' && trimmedValue !== '') {
      if (type === 'password') {
        if (patternString.trim() !== trimmedValue) {
          errorMessage = getErrorMessage(VALIDATION_ERRORCODE_INVALID_FORMAT);
          errorLabel = createErrorLabel(element, errorMessage);
        }
      } else {
        pattern = new RegExp(patternString);

        isValidated = true;

        if (pattern.test(trimmedValue) === false) {
          errorMessage = getErrorMessage(VALIDATION_ERRORCODE_INVALID_FORMAT);
          errorLabel = createErrorLabel(element, errorMessage);
        }
      }
    }

    if (isValidated === true && errorMessage === '') {
      addSuccessLabel(element);
    } else if (isValidated === true) {
      addErrorLabel(element, errorLabel);
    } else {
      element.classList.remove('invalid');

      var nodes = queryAll('.errormessage[for="' + id + '"], .successmessage:not(.informationMessage)', element.parentNode.parentNode);
      nodes.forEach(function(el) {
        removeElement(el)
      })
    }
  } else {
    element.classList.remove('invalid', 'valid');

    var nodes = queryAll('.successmessage, .errormessage', element.parentNode.parentNode);
    nodes.forEach(function(el) {
      removeElement(el)
    })
  }

  return errorMessage;
}
