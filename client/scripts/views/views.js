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

var dependencies = ['views/structure','views/navigation','views/circunscripciones-view','views/info-view'];

function Module(structure,navigation,circunscripciones,info) {

  return { 
    Views: function() {
      structure.Structure();
      navigation.Navigation();
      circunscripciones.circunscripcionesView();
    }
  }
}

define(dependencies, Module);