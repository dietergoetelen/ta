(function () {

  angular.module('app.bootstrap', [])
    .directive('row', row)
    .directive('column', column);

  function row() {
    return {
      restrict: 'E',
      scope: true,
      template: '<div class="row"></div>',
      transclude: true,
      replace: true,
      link: link
    };

    function link(scope, element, attrs, controller, linker) {
      linker(scope, function(clone){
        element.append(clone); // add to DOM
      });
    }
  }

  function column() {
    return {
      restrict: 'E',
      scope: true,
      template: "<div ng-transclude></div>",
      transclude: true,
      compile: compile,
      replace: true
    };

    function compile(element, attrs) {
      var colSize = attrs.size || 12;
      var overWrite = attrs.overwrite;

      if (overWrite) {
        element.addClass(overWrite);
      } else {
        element.addClass('col-md-' + colSize);
      }
    }
  }

}());
