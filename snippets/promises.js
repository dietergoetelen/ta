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
