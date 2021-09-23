import { queryAll, removeElement } from "./helpers";

/**
 * @param  {Element} element
 * @return {Element}
 */
export default function addSuccessLabel(element) {
  var successLabel = createSuccessLabel();
  var container = element.parentNode.parentNode;
  var id = element.getAttribute('id');

  resetFieldStatus(element);

  removeExistingErrorMessage(container, id);

  return successLabel;
}

/**
 * @param {Element} element
 */
function resetFieldStatus(element) {
  element.classList.remove('invalid');
  element.classList.add('valid');
}

/**
 * @param  {Element}  container
 * @param  {string}  id
 * @return {boolean}
 */
function hasExistingErrorMessages(container, id) {
  var existingErrorMessages = getExistingErrorMessages(container, id);

  return existingErrorMessages;
}

/**
 * Check if there is no message present for the current element, there is no succesmessage present.
 * and no error messages.
 * @param  {Element}  container
 * @param  {string}  id
 * @return {boolean}
 */
function hasNoMessages(container, id) {
  var existingOtherErrorMessages = getExistingOtherErrorMessages(container, id);
  var existingSuccessMessage = getExistingSuccessMessage(container);
  var existingErrorMessage = getExistingErrorMessages(container, id);

  return (
    !existingErrorMessage &&
    !existingSuccessMessage === 0 &&
    !existingOtherErrorMessages === 0
  );
}

/**
 * @param  {Element}  container
 * @return {boolean}
 */
function areAllRequiredFieldsValid(container) {
  var requiredInputFields = getRequiredInputFields(container);
  var requiredValidInputFields = getRequiredValidInputFields(container);

  return requiredInputFields.length === requiredValidInputFields.length;
}

/**
 * @return {Element}
 */
function createSuccessLabel() {
  var element = document.createElement('label');
  var child = document.createElement('i');

  element.classList.add('successmessage');
  child.classList.add('successmessage--icon', 'icon', 'icon-checkmark', 'icon-position-middle')
  element.appendChild(child);

  return element;
}

/**
 * @param {Element} container
 * @param {string} id
 */
function removeExistingErrorMessage(container, id) {
  var existingErrorMessages = getExistingErrorMessages(container, id);

  existingErrorMessages.forEach(function(element) {
    removeElement(element);
  })
}

/**
 * @param  {Element} container
 * @param  {string} id
 * @return {Array}
 */
function getExistingErrorMessages(container, id) {
  return queryAll('.errormessage[for="' + id + '"]', container);
}

/**
 * @param  {Element} container
 * @return {Array}
 */
function getRequiredInputFields(container) {
  return queryAll('[required]:not([type="hidden"])', container);
}

/**
 * @param  {Element} container
 * @return {Array}
 */
function getRequiredValidInputFields(container) {
  return queryAll('[required].valid', container);
}

/**
 * @param  {Element} container
 * @param  {string} id
 * @return {Array}
 */
function getExistingOtherErrorMessages(container, id) {
  return queryAll('.errormessage:not([for="' + id + '"])', container);
}

/**
 * @param  {Element} container
 * @return {Array}
 */
function getExistingSuccessMessage(container) {
  return queryAll('.successmessage', container);
}
