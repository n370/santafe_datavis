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

  function click_circuitos_judiciales() {
    var name = this.model.attributes.name;
    var capa = document.querySelector('#'+ name);
    var button = document.querySelector('#button-'+ name);
    if ('circuitos_judiciales' === name) {
      capa.classList.toggle('hidden');
      button.classList.toggle('button-selected');
    }
  }  

  function click_circunscripciones_judiciales() {
    var name = this.model.attributes.name;
    var capa = document.querySelector('#'+ name);
    var button = document.querySelector('#button-'+ name);
    if ('circunscripciones_judiciales' === name) {
      capa.classList.toggle('hidden');
      button.classList.toggle('button-selected');
    }
  }  

  function click_distritos_judiciales() {
    var name = this.model.attributes.name;
    var capa = document.querySelector('#'+ name);
    var button = document.querySelector('#button-'+ name);
    if ('distritos_judiciales' === name) {
      capa.classList.toggle('hidden');
      button.classList.toggle('button-selected');
    }
  }

  function initialize() {
    var name = this.model.attributes.name;
    
    function parseName(str) {
      var name = str; 
      matched = name.match(/\w+_/).toString(); 
      subgroup = matched.substring(0, matched.length - 1);
      return subgroup;
    }

    this.$el.append(this.template([name,parseName(name)]));
  }

  _.templateSettings.variable = "name";

  return { 
    Control: Backbone.View.extend({
      el: '#prueba',
      template: _.template($('#control').html()),
      events: {
        'click #button-circuitos_judiciales': 'click_circuitos_judiciales',
        'click #button-circunscripciones_judiciales': 'click_circunscripciones_judiciales',
        'click #button-distritos_judiciales': 'click_distritos_judiciales'
      },
      initialize: initialize,
      click_circuitos_judiciales: click_circuitos_judiciales,
      click_circunscripciones_judiciales: click_circunscripciones_judiciales,
      click_distritos_judiciales: click_distritos_judiciales
    })
  }
}

define(dependencies, Module);