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

function Module() {

  function initialize() {

  }

  function render() {
    this.$el.html(this.template());
    return this;
  }

  return { 
    Structure: function() {
      var Structure = Backbone.View.extend({
        el: 'body',
        template: _.template($('#app-structure').html()),
        events: {},
        initialize: initialize,
        render: render,
      });

      var structure = new Structure();
      structure.render(); 
    }
  }
}

define(dependencies, Module);