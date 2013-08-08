


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

  App.Resource = DS.Model.extend({
    "@id": DS.attr('string'),
    "@type": DS.attr('string')
  });

  App.Person = App.Resource.extend({
    "name": DS.attr('string'),
    "foaf": DS.attr('string')  // ?? may not be needed - value may always be "Person"
  });

  App.Target = App.Resource.extend({
    "selector": DS.attr(array, "Selector")  // define this custom object type using registerTransform ??
  });

  App.Body = App.Resource.extend({
    "chars": DS.attr('string')
  });

  App.Annotation = App.Resource.extend({
    "annotatedBy": DS.belongsTo("App.Person"),
    "annotatedAt": DS.attr('date'),
    "body": DS.belongsTo("App.Body"),
    "target": DS.belongsTo("App.Target")
  });

  //
  // DATA STORE
  //

  App.Store = DS.Store.extend({
    revision: 1,
    adapter: 'DS.FixtureAdapter'
  });


}).call(this);
