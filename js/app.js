


(function() {

  window.App = Ember.Application.create({
    customEvents: {
      blur: 'blur'
    }
  });

  App.ApplicationView = Ember.View.extend({
    classNames: 'ember-app',
    templateName: 'application'
  });

  App.ApplicationController = Ember.Controller.extend({

    tableSimpleExampleController: Ember.computed(function() {
      return Ember.get('App.TableSimpleExample.TableController').create();
    }).property(),
    
  });

}).call(this);



(function() {

  App.TableSimpleExample = Ember.Namespace.create();

  App.TableSimpleExample.LazyDataSource = Ember.ArrayProxy.extend({
    objectAt: function(idx) {
      var date, row;
      row = this.get('content')[idx];
      if (row) {
        return row;
      }
      date = new Date();
      date.setDate(date.getDate() + idx);
      row = {
        index: idx,
        date: date,
        open: Math.random() * 100 - 50,
        high: Math.random() * 100 - 50,
        low: Math.random() * 100 - 50,
        close: Math.random() * 100 - 50,
        volume: Math.random() * 1000000
      };
      this.get('content')[idx] = row;
      return row;
    }
  });

  App.TableSimpleExample.TableController = Ember.Table.TableController.extend({
    hasHeader: true,
    hasFooter: false,
    numFixedColumns: 0,
    numRows: 500000,
    rowHeight: 30,
    columns: Ember.computed(function() {
      var columnNames, columns, dateColumn, entryColumn;
      columnNames = ['open', 'high', 'low', 'close', 'volume'];
      entryColumn = Ember.Table.ColumnDefinition.create({
        columnWidth: 100,
        headerCellName: 'Entry',
        getCellContent: function(row) {
          return row['index'];
        }
      });
      dateColumn = Ember.Table.ColumnDefinition.create({
        columnWidth: 150,
        headerCellName: 'Date',
        getCellContent: function(row) {
          return row['date'].toDateString();
        }
      });
      columns = columnNames.map(function(key, index) {
        var name;
        name = key.charAt(0).toUpperCase() + key.slice(1);
        return Ember.Table.ColumnDefinition.create({
          columnWidth: 100,
          headerCellName: name,
          getCellContent: function(row) {
            return row[key].toFixed(2);
          }
        });
      });
      columns.unshift(dateColumn);
      columns.unshift(entryColumn);
      return columns;
    }).property(),
    content: Ember.computed(function() {
      return App.TableSimpleExample.LazyDataSource.create({
        content: new Array(this.get('numRows'))
      });
    }).property('numRows')
  });

}).call(this);