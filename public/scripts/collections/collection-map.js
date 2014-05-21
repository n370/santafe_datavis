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

require(["..scripts/models/model-map"], function(model-map) {	
	define({
        collection-map: Backbone.Collection.extend({
	      model: model-map,
	      url: '/map' // Rota HTTP que mandará uma Array de JSON.
	    }),
        maps: new collection-map() // Instancia a colleção.
    });
});