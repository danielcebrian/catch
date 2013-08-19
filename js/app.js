


(function() {

  window.App = window.App || {};
  App.data = App.data || {};
  App.dom = App.dom || {};
  App.templates = App.templates || {};

  //
  // TEMPLATES
  //

  var TEMPLATES = [
    "mediaList",
    "mediaItem",
    "mediaRow",
    "mediaDetail",
    "annotationList",
    "annotationItem",
    "annotationRow",
    "annotationDetail"
  ];

  var compileTemplates = function() {
    TEMPLATES.forEach(function(templateName) {
      App.templates[templateName] = Handlebars.compile($("#"+templateName+"_Template").text());
    });
  };

  //
  // RENDER MEDIA
  //

  var renderMedia = function() {
    var mediaItems = [];
    App.data.media.forEach(function (item) {
      var html = App.templates.mediaItem({
        item: item,
        mediaRow: App.templates.mediaRow(item),
        mediaDetail: ""
      });
      mediaItems.push(html);
    });
    $(".mediaListContainer").html(App.templates.mediaList({ mediaItems: mediaItems }));
  };




  //
  // START APP
  //

  App.refresh = renderMedia;

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
    App.refresh();
  });




}).call(this);


