import inputValidation from './validation/inputValidation';
import getValidationMessages from './validation/getValidationMessages';

function formValidation() {
  var jsonMessages = getValidationMessages();
  var form;
  var inputs;
  var radiobuttons;
  var radiobuttonNames;

  if (Object.keys(jsonMessages).length > 0) {
    form = document.querySelector('#personal_details_form');
    inputs = form.querySelectorAll('input:not([type="radio"]),textarea,select');
    radiobuttons = form.querySelectorAll('[type="radio"]');
    radiobuttonNames = [];

    radiobuttons.forEach(function (element) {
      var elementName = element.getAttribute('name');

      if (radiobuttonNames.indexOf(elementName) < 0) {
        radiobuttonNames.push(elementName);
      }
    });

    form.addEventListener('submit', (event) => {
      var hasErrors = false;

      inputs.forEach(function (element) {
        var errormessage = inputValidation(element, jsonMessages);

        if (errormessage !== '') {
          hasErrors = true
        }
      });

      if (hasErrors) {
        event.preventDefault();
      }
    });

    inputs.forEach(function (element) {
      /*
       * Validate a pre-filled or returning form.
       */
      if (element.value.trim().length > 0) {
        inputValidation(element, jsonMessages);
      }

      /*
       * Trigger input validation on input content change.
       */
      element.addEventListener('change', function () {
        inputValidation(element, jsonMessages);
      });
    });
  }
}

formValidation();
