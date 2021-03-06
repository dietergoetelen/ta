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

  function SurveyController(surveyService, $window) {
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
      if (!isValid) {
        $window.alert('Hej, this form is not valid.. :(');
        return;
      }

      surveyService.saveSurvey(formData).then(function (surveyId) {
        $window.alert('Cool, saved a survey with ID: ' + surveyId)
      });
    }
  }


  app.service('surveyService', SurveyService);

  function SurveyService($q, $window) {
    var vm = this,
        storageKey = "SURVEY_DATA";

    vm.saveSurvey = saveSurvey;
    vm.getSurveys = getSurveys;

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function saveSurvey(data) {
      return getSurveys().then(function(surveys) {
        data.id = guid();

        surveys.push(data);

        $window.localStorage.setItem(storageKey, angular.toJson(surveys));

        return data.id;
      });
    }

    function getSurveys() {
      var deferred = $q.defer();

      // make it async
      setTimeout(function () {
        deferred.resolve(angular.fromJson($window.localStorage.getItem(storageKey) || []));
      });

      return deferred.promise;
    }
  }
}());
