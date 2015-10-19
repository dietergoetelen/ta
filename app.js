(function () {
  "use strict";
  // styleguide: https://github.com/johnpapa/angular-styleguide

  // Module declaration
  var app = angular.module('app', [
    'app.bootstrap'
  ]);

  // HeaderController
  app.controller('HeaderController', HeaderController);

  function HeaderController() {
    var vm = this;

    vm.title = "Survey";
  }

  // SurveyController
  app.controller('SurveyController', SurveyController);

  function SurveyController(surveyService, $window) {
    var vm = this;

    vm.showError = showError;
    vm.saveSurvey = saveSurvey;

    // form defaults
    initialize();

    function initialize() {
      vm.formData = {
        happiness: '3',
        language: {
          cSharp: true,
          javascript: true
        }
      };
    }

    function showError(property, form) {
      return form.$submitted && form[property].$invalid || form[property].$dirty && form[property].$invalid;
    }

    function saveSurvey(isValid, formData) {
      if (!isValid) {
        $window.alert('Hej, this form is not valid.. :(');
        return;
      }

      surveyService.saveSurvey(formData).then(function (surveyId) {
        $window.alert('Cool, saved a survey with ID: ' + surveyId)
      });
    }

  }

  // SurveyService
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

  // layout controller
  app.controller('LayoutController', LayoutController);

  function LayoutController() {
    var vm = this;

    vm.handleActivity = handleActivity;

    initialize();

    function initialize() {
      vm.active = {
        survey: true,
        results: false
      };
    }

    function handleActivity(obj) {
      vm.active[obj.active] = true;
      vm.active[obj.inactive] = false;
    }
  }

  // Results controller
  app.controller('ResultController', ResultController);

  function ResultController(surveyService) {
    var vm = this;

    initialize();

    function initialize() {
      return surveyService.getSurveys().then(function (surveys) {
        vm.surveys = surveys;

        return surveys;
      });
    }
  }

}());
