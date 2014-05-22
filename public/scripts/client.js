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

requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        mapView: '../scripts/views/map-view',
        backbone: 'backbone/backbone',
        d3: 'd3/d3.min',
        jquery: 'jquery/dist/jquery.min',
        topojson: 'topojson/topojson',
        underscore: 'underscore/underscore'
    }
});

var dependencies = ['backbone','d3','jquery','topojson','underscore','mapView'];

// Función principal de la aplicación.
function client(Backbone,d3,$,topojson,_,mapView) {
  // Oculta y muestra la barra de navegación,
  // en algún mumento saldrá de acá.
	$('#button-bars').click(function() {
	  var state = $('#sub-navbar-top').is(':hidden'); 	
    if (state) {
      $('#sub-navbar-top').slideDown();
      $(this).addClass('button-selected');
    } else {
      $('#sub-navbar-top').slideUp();
      $(this).removeClass('button-selected');
    }
  });

  var maps = new mapView.mapView();
  maps.initialize();

  return {};    
} // Clients closing bracket.

// Inicializa la aplicación.
requirejs(dependencies, client);