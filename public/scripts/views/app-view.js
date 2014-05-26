/*
{
  "authors": [
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ],
  "contributors": [    
    {
      "name": {
        "first": "Dylson",
        "last": "Valente Neto",
        "alias": ["n370", "n370n370"]
      },  
      "email": ["dvalenteneto@santafe.gov.ar"]
    } 
  ] 
}
*/

var dependencies = [];

function View() {
  function initialize() {

  }

  function render() {
    this.$el.html(this.template());
    return this;
  }

  return { 
    Structure: function() {
      var mapView = Backbone.View.extend({
        el: 'body',
        template: _.template($('#app-structure').html()),
        events: {
          click: ''
        },
        initialize: initialize,
        render: render,
      });

      var app = new Structure();
      app.render(); 
    }
  }
}

define(dependencies, View);