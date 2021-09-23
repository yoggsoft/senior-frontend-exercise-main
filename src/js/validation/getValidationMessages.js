import validationMessages from '../validationMessages';

/**
 * @param {Object} [overrideValidationMessages]
 * @returns {Object}
 */
export default function getValidationMessages(overrideValidationMessages) {
  return overrideValidationMessages || validationMessages || {};
}
