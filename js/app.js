


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

  var renderBasicAnnotations = function(el) {
    el = el || $("#main-list");
    App.data.annotations.slice(0,10).forEach(function(item) {
      var content = renderObject(item);
      var annotationHtml = App.templates.annotation({
        id: item["@id"],
        content: content
      });
      el.append(annotationHtml);
    });
  };


  //
  // TABULAR ANNOTATION RENDERING
  //

  App.tables = App.tables || {};
  App.tables.basic = {
    columns: [
      { id: "annotatedAt", name: "Date" },
      { id: "annotatedBy", name: "Annotated By" },
      { id: "body", name: "Body" }
    ]
  };

  var createHeader = function(columns) {
    var headerHtml = "<thead><tr>";
    columns.forEach(function(column) {
      headerHtml = headerHtml + '<th id="header-' + column.id + '">' + column.name + '</th>';
    });
    headerHtml = headerHtml + "</tr></thead>";
    return headerHtml;
  };

  var createRow = function(columns, data) {
    var rowHtml = "<tr>";
    columns.forEach(function(column) {
      rowHtml = rowHtml + '<td class="column-' + column.id + '">' + data[column.id] + '</td>';
    });
    rowHtml = rowHtml + "</tr>";
    return rowHtml;
  };


  var renderTabularAnnotations = function(el) {
    el = el || $("#main-list");
    var tableType = App.tables.basic;
    var tableHtml = App.templates.annotationTable();
    el.html(tableHtml);
    el.append(createHeader(tableType.columns));
    el.append("<tbody>");
    App.data.annotations.slice(0,10).forEach(function(item) {
      var rowHtml = createRow(tableType.columns, {
        annotatedAt: item.annotatedAt,
        annotatedBy: item.annotatedBy.name,
        body: item.body.chars
      });
      el.append(rowHtml);
    });
    el.append("</tbody");
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


