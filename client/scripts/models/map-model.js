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

var dependencies = ['backbone'];

function Module(Backbone) {
  return {
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

      // Define attributos por padrón para
      // cada nuevo modelo.
      defaults: { 
        // Acá entra una lista associativa
        // con atributos y valores.
      }, 
      
      // Valida los modelos y retorna null  
      // si és valido. Emite 'invalid' si es inválida.
      validate: function(attributes) {}
    })
  }  
}

define(dependencies, Module);