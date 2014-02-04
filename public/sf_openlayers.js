/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

//  Add this string to your html file to load the library: <script src="http://ol3js.org/en/master/build/ol.js" type="text/javascript"></script>


var controle = new ol.Collection([ /*new ol.interaction.DragPan()*/ ]);
  
var ver = new ol.View2D({
  center: [-6757907.320209994, -3717553.603945332],
  zoom: 14
});

var camada = [ new ol.layer.Tile({ source: new ol.source.OSM() }) ];
    
var mapa = new ol.Map({
  layers: camada,
  interactions: controle,
  view: ver,
  target: 'map' // Set this value to a div's id attribute value to render the map.
});