import validationMessages from '../window-exports/validationMessages';

/**
 * @param {Object} [overrideValidationMessages]
 * @returns {Object}
 */
export default function getValidationMessages(overrideValidationMessages) {
  return overrideValidationMessages || validationMessages || {};
}
