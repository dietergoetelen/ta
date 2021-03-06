(function () {
  "use strict";
  // styleguide: https://github.com/johnpapa/angular-styleguide

  // Module declaration
  var app = angular.module('app', ['app.bootstrap']);

  app.controller('HeaderController', HeaderController);

  function HeaderController() {
    var vm = this;

    vm.title = "Survey";
  }

  app.controller('SurveyController', SurveyController);

  function SurveyController() {
    var vm = this;

    vm.saveSurvey = saveSurvey;
    vm.showError = showError;

    initialize();

    function initialize() {
      vm.formData = {
        happiness: "3"
      };
    }

    function showError(property, form) {
      return form.$submitted && form[property].$invalid || form[property].$dirty && form[property].$invalid;
    }

    function saveSurvey(formData, isValid) {
      if (isValid) {
        console.log(formData);
      }
    }

  }
}());
