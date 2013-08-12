


(function() {

  window.App = Ember.Application.create();

  //
  // ROUTER
  //

  /*
  App.Router.map(function() {
    // put your routes here
    this.resource('index', { path: '/' });
  });

  App.IndexRoute = Ember.Route.extend({
    model: function() {
      return ['red', 'yellow', 'blue'];
    }
  });
  */

  //
  // MODELS
  //

  App.Models = App.Models || {};

  App.Models.Resource = DS.Model.extend({
    "@id": DS.attr('string'),
    "@type": DS.attr('string')
  });

  App.Models.Person = App.Models.Resource.extend({
    "name": DS.attr('string'),
    "foaf": DS.attr('string')  // ?? may not be needed - value may always be "Person"
  });

  App.Models.Selector = App.Models.Resource.extend({
    "@type": DS.attr("string"),
    "item": DS.attr("string"),  // serialized object
    "0": DS.attr("string")  // serialized object
  });

  App.Models.Target = App.Models.Resource.extend({
    "selector": DS.attr("array", "App.Models.Selector")
  });

  App.Models.Body = App.Models.Resource.extend({
    "chars": DS.attr('string')
  });

  App.Models.Annotation = App.Models.Resource.extend({
    "annotatedBy": DS.belongsTo("App.Person"),
    "annotatedAt": DS.attr('date'),
    "body": DS.belongsTo("App.Body"),
    "target": DS.belongsTo("App.Target")
  });

  /*  TBD

  App.MediaObject = App.Resource.extend({
    "id": DS.attr('string'),
    "title": DS.attr('string'),
    "mediaType": DS.attr('string'),
    "owner": DS.attr('string'),  // maybe App.Person ?
    "client": DS.attr('string'),
    "lastAnnotated": DS.attr('date'),  //
    "annotationCount": DS.attr('integer'),
    "numberOfTags": DS.attr('integer')
  });

  */


  //
  // DATA STORE
  //

  App.Store = DS.Store.extend({
    revision: 1,
    adapter: 'DS.FixtureAdapter'
  });


  //
  // FIXTURES
  //

  $(function() {
    var anno_json = $("#annotationsFixture").text();
    App.Fixtures = App.Fixtures || {};
    App.Fixtures.Annotations = JSON.parse(anno_json);
  });


}).call(this);


