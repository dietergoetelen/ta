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

  }

}());
