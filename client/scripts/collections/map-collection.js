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
var dependencies = ["models/map-model","backbone"];

function Module(Model, Backbone) { 

  var collection = Backbone.Collection.extend({
    model: Model.mapModel,
    url: '/maps' // Rota HTTP que mandará uma Array de JSON.
  });
  return {
    mapCollection: new collection()
  }
}

define(dependencies, Module);