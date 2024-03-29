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
    this.render(); 
  }

  function render() {
    this.$el.prepend(this.template());
    return this;
  }

  return { 
    Search: Backbone.View.extend({
      el: '#map-panel',
      template: _.template($('#search').html()),
      events: {},
      initialize: initialize,
      render: render
    })
  }
}

define(dependencies, Module);