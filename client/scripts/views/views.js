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

var dependencies = ['views/structure','views/brand','views/search','views/control','views/map-view','views/info-view'];

function Module(structure,brand,search,control,maps,info) {

  return { 
    Views: function() {
      var Structure = new structure.Structure();
      var Brand = new brand.Brand(); 
      var Search = new search.Search();
      var Maps = new maps.mapView();
      var Control = new control.Control({ names: function(names) { 
        names = { names: ['circunscripciones','circuitos','distritos'] }; 
        return names;
      }});
      console.log(Maps.layers);
    }
  }
}

define(dependencies, Module);