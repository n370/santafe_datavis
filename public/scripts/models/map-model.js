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

define({
  mapModel: Backbone.Model.extend({
    initialize: function(){
      this.on('invalid', function(model, error){
        console.log(error);
      }),
      this.on('change', function() {
        console.log('Values for this model has changed.');
      }),
      this.on('change:alias', function() {
        console.log('Alias value for this model has changed.');
      })
    },

    // Define default attributes.
    defaults: {}, 
    
    validate: function(attributes) {}
  })
});