

(function() {

  window.App = Ember.Application.create();

  App.Router.map(function () {
    this.resource('index', { path: '/' });
  });

}).call(this);

