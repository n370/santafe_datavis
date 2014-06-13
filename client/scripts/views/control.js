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
    this.$el.append(this.template(this.names));
  }
  
  _.templateSettings.variable = "names";

  return { 
    Control: Backbone.View.extend({
      el: '#info-panel-body',
      template: _.template($('#control').html()),
      events: {},
      initialize: initialize,
      render: render
    })
  }
}

define(dependencies, Module);