


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
    var index = 0;
    App.data.media.forEach(function (item) {
      var html = App.templates.mediaItem({
        item: item,
        evenOrOdd: index % 2 ? "odd" : "even",
        mediaRow: App.templates.mediaRow(item),
        mediaDetail: App.templates.mediaDetail({ annotationList: ""})
      });
      index++;
      mediaItems.push(html);
    });
    $(".mediaListContainer").html(App.templates.mediaList({ mediaItems: mediaItems }));
  };

  var expandMediaItem = function(mediaId) {
    var el = $("#mediaItem_" + mediaId + " .mediaDetail");
    var annotationItems = [];
    var index = 0;
    App.data.annotations.forEach(function(item) {
      var html = App.templates.annotationItem({
        item: item,
        evenOrOdd: index % 2 ? "odd" : "even",
        annotationRow: App.templates.annotationRow(item),
        //annotationDetail: App.templates.annotationDetail(item)
        annotationDetail: ""
      });
      index++;
      annotationItems.push(html);
    });
    el.html(App.templates.annotationList({ annotationItems: annotationItems }));
  };




  //
  // START APP
  //

  App.refresh = function() {
    renderMedia();
    expandMediaItem("345");
  };

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


