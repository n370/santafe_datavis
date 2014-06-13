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

var dependencies = ['views/structure','views/brand','views/search','views/map-view'];

function Module(structure,brand,search,maps) {

  return { 
    Views: function() {
      var Structure = new structure.Structure();
      var Brand = new brand.Brand(); 
      var Search = new search.Search();
      var Maps = new maps.mapView();
    }
  }
}

define(dependencies, Module);