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

var dependencies = ['underscore','backbone'];

function Module(_,Backbone) {

  function click_departamentos_santafe() {
    var name = this.model.attributes.name;
    var capa = $('#'+ name);
    if ('departamentos_santafe' === name) {
      console.log(capa);
      capa.toggleClass('hidden');
    }
  }

  function initialize() {
    this.name = this.model.attributes.name;
    this.$el.append(this.template(this.model));
  }

  _.templateSettings.variable = "model";

  return { 
    Control: Backbone.View.extend({
      el: '#prueba',
      template: _.template($('#control').html()),
      events: {
        'click #button-departamentos_santafe': 'click_departamentos_santafe'
      },
      initialize: initialize,
      click_departamentos_santafe: click_departamentos_santafe
    })
  }
}

define(dependencies, Module);