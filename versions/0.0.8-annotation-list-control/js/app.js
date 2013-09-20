


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
    "annotationDetail",
    "videoAnnotationDetail"
  ];

  var compileTemplates = function() {
    TEMPLATES.forEach(function(templateName) {
      App.templates[templateName] = Handlebars.compile($("#"+templateName+"_Template").text());
    });
  };

  Handlebars.registerHelper('deparagraph', function(txt) {
    var dpg = txt.replace("<p>", "").replace("</p>", "");
    console.log("deparagraph on: " + txt);
    console.log(dpg);
    return dpg;
    
  });



  //
  // EVENT HANDLERS
  //

  var openMediaItem = function(evt) {
    $(evt.currentTarget).closest(".mediaItem").removeClass("closed").addClass("open");
  };

  //
  // TODO: Better disposal of contents upon close
  //
  var closeMediaItem = function(evt) {
    $(evt.currentTarget).closest(".mediaItem").removeClass("open").addClass("closed");
  };

  var openAnnotationItem = function(evt) {
    $(evt.currentTarget).closest(".annotationItem").removeClass("closed").addClass("open");
  };

  //
  // TODO: Better disposal of contents upon close
  //
  var closeAnnotationItem = function(evt) {
    $(evt.currentTarget).closest(".annotationItem").removeClass("open").addClass("closed");
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
        openOrClosed: "closed",
        expandable: (item.id === "345" || item.id === "456") ? true : false,
        mediaRow: App.templates.mediaRow(item),
        mediaDetail: App.templates.mediaDetail({ annotationList: ""})
      });
      index++;
      mediaItems.push(html);
    });
    $(".mediaListContainer").html(App.templates.mediaList({ mediaItems: mediaItems }));
    $(".mediaItem .mediaRow").on("click", function(evt) {
      var isClosed = $(evt.currentTarget).closest(".mediaItem").hasClass("closed");
      if (isClosed) {
        openMediaItem(evt);
      } else {
        closeMediaItem(evt);
      }
    });
  };

  renderAnnotations = function(mediaObj, annotations, el) {
    var mediaId = mediaObj.id;
    var mediaType = mediaObj.type;
    var annotationItems = [];
    var index = 0;
    var items = (mediaType === "video") ? App.data.videoAnnotations : App.data.annotations;
    items.forEach(function(item) {
      //console.log("rendering annotation: " + item["target"]["selector"][0]["0"].exact);
      var html = App.templates.annotationItem({
        item: item,
        evenOrOdd: index % 2 ? "odd" : "even",
        openOrClosed: "closed",
        annotationRow: App.templates.annotationRow(item),
        annotationDetail: (mediaType === "video") ? App.templates.videoAnnotationDetail(item) : App.templates.annotationDetail({ media: mediaObj, annotatedBy: item.annotatedBy, body: item.body, target0: item.target.selector[0]["0"], targetItem: item.target.selector[0].item })
      });
      index++;
      annotationItems.push(html);
    });
    el.html(App.templates.annotationList({ annotationItems: annotationItems }));
    el.on("click", ".annotationItem .annotationRow", function(evt) {
      var isClosed = $(evt.currentTarget).closest(".annotationItem").hasClass("closed");
      if (isClosed) {
        openAnnotationItem(evt);
      } else {
        closeAnnotationItem(evt);
      }
    });
    el.on("click", ".annotationItem .closeDetailIcon", function(evt) {
      closeAnnotationItem(evt);
    });
  };



  //
  // START APP
  //

  App.refresh = function() {

    //renderAnnotations(App.data.media[3]);
    renderAnnotations(App.data.media[0], App.data.media[0].annotations, $(".annotationListContainer"));
    //renderAnnotations({id: "345", type: "text"});
    //renderAnnotations({id: "456", type: "video"});
    openAnnotationItem({currentTarget: $(".annotationRow")[2]});
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
    anno_items.pop();  // error in last anno for some reason
    App.data.annotations = anno_items;
  };


  $(function() {
    compileTemplates();
    loadFixtures();
    App.refresh();
  });




}).call(this);


