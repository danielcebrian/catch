


(function() {

  window.App = window.App || {};
  App.data = App.data || {};
  App.dom = App.dom || {};
  App.templates = App.templates || {};

  //
  // TEMPLATES
  //

  var compileTemplates = function() {
    App.templates.annotationProperty = Handlebars.compile($("#annotation-property-template").text());
    App.templates.annotation = Handlebars.compile($("#annotation-template").text());
    App.templates.annotationTable = Handlebars.compile($("#annotation-table-template").text());
    App.templates.annotationTableRow = Handlebars.compile($("#annotation-table-row-template").text());
  };


  //
  // BASIC ANNOTATION RENDERING
  //

  var renderObject = function(obj, level) {
    level = level || 0;
    var html = "";
    for (var prop in obj) {
      var val = obj[prop];
      if (typeof val === "object" && val.toString() === "[object Object]") {
        html = html + App.templates.annotationProperty({
          level: level,
          property: prop,
          value: renderObject(val, level + 1)
        });
      } else {
        console.log("property: " + prop);
        html = html + App.templates.annotationProperty({
          level: level,
          property: prop,
          value: val
        });
      }
    }
    return html;
  };

  var renderBasicAnnotations = function() {
    App.dom.mainList = $("#main-list");
    App.data.annotations.slice(0,10).forEach(function(item) {
      var content = renderObject(item);
      var annotationHtml = App.templates.annotation({
        id: item["@id"],
        content: content
      });
      App.dom.mainList.append(annotationHtml);
    });
  };


  //
  // TABULAR ANNOTATION RENDERING
  //

  var renderTabularAnnotations = function() {
    App.dom.mainList = $("#main-list");
    var tableHtml = App.templates.table({});
    App.dom.mainList.html(tableHtml);
  };


  //
  // START APP
  //

  App.render = renderTabularAnnotations;

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
    compileTemplates();
    loadFixtures();
    App.render();
  });




}).call(this);


