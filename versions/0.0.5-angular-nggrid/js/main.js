


(function() {

  window.App = window.App || {};
  App.data = App.data || {};
  App.dom = App.dom || {};
  App.templates = App.templates || {};
  App.controllers = App.controllers || {};

  //App.app = angular.module('app', ['ngGrid', ngGridFlexibleHeightPlugin]);
  App.app = angular.module('app', ['ngGrid']);

  App.app.controller('BasicGrid', function($scope) {
    $scope.myData = App.data.annotations;
    $scope.gridOptions = {
      data: 'myData',
      columnDefs: [
        { width: "20%", field: "annotatedBy", displayName: "Annotated By", cellTemplate: '<div class="ngCellText">{{row.getProperty(col.field).name}}</div>' },
        { width: "20%", field: "annotatedAt", displayName: "Annotated At"},
        { width: "60%", field: "body", displayName: "Body", cellTemplate: '<div class="ngCellText" ng-bind-html-unsafe="row.getProperty(col.field).chars"></div>' }
      ]
    };
  });

  //
  // FIXTURES
  //

  var loadFixtures = function() {
    var anno_json = $("#annotationsFixture").text();
    var anno_items = JSON.parse(anno_json)['items'];
    /* optional
    anno_items.forEach(function(item) {
      item.id = item['@id'];
      item.type = item['@type'];
    });
    */
    App.data.annotations = anno_items;
  };


  $(function() {
    loadFixtures();
    angular.element("#main").scope().myData = App.data.annotations;
  });




}).call(this);


