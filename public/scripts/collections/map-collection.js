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

define(["../models/map-model"], function(mapModel) {	
  var collection = Backbone.Collection.extend({
    model: mapModel,
    url: '/maps' // Rota HTTP que mandará uma Array de JSON.
  });
  return {
    mapCollection: new collection()
  }
});