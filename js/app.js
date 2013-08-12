


(function() {

  window.App = window.App || {};
  App.data = App.data || {};
  App.dom = App.dom || {};
  App.templates = App.templates || {};

  //
  // TEMPLATES
  //

  var compileTemplates = function() {
    App.templates.annotation = Handlebars.compile($("#annotation-template").text());
  };



  //
  // START APP
  //

  App.render = function() {
    App.dom.mainList = $("#main-list");
    var mainHtml = "";
    App.data.annotations.forEach(function(item) {
      mainHtml = mainHtml + App.templates.annotation(item);
    });
    App.dom.mainList.html(mainHtml);
  };

  //
  // FIXTURES
  //

  var loadFixtures = function() {
    var anno_json = $("#annotationsFixture").text();
    var anno_items = JSON.parse(anno_json)['items'];
    anno_items.forEach(function(item) {
      item.id = item['@id'];
      item.type = item['@type'];
    });
    App.data.annotations = anno_items;
  };


  $(function() {
    compileTemplates();
    loadFixtures();
    App.render();
  });




}).call(this);


