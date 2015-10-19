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

    initialize();

    function initialize() {
      vm.formData = {
        happiness: "3"
      };
    }

    function saveSurvey(formData) {

      console.log(formData);

    }

  }
}());
