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

var dependencies = ['views/map','views/control','backbone'];

function Module(map,control,Backbone) {
  
  function initialize() {
    var m = new map.Map({ model: this });
    var c = new control.Control({ model: this });

    /*this.on('invalid', function(model, error){
      console.log(error);
    }),
    this.on('change', function() {
      console.log('Values for this model has changed.');
    }),
    this.on('change:alias', function() {
      console.log('Alias value for this model has changed.');
    })*/

  }

  var Model = Backbone.Model.extend({
    initialize: initialize,

    // Define attributos por padrón para
    // cada nuevo modelo.
    // Acá entra una lista associativa
    // con atributos y valores por defecto.
    defaults: { }, 
    
    // Valida los modelos y retorna null  
    // si és valido. Emite 'invalid' si es inválida.
    validate: function(attributes) {}
  })

  return { Map: Model }  
}

define(dependencies, Module);