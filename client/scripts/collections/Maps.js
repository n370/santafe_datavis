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
var dependencies = ["models/Map","backbone"];

function Module(Model, Backbone) { 
  function initialize() {
    this.fetch();
  }

  var Collection = Backbone.Collection.extend({
    model: Model.Map,
    url: '/maps', // Rota HTTP que mandará uma Array de JSON.
    initialize: initialize
  });

  return { Maps: Collection }
}

define(dependencies, Module);