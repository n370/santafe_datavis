/*
Author: Dylson Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

/************* Using ol3js  *************/

var ver = new ol.View2D({
      center: [-6757907.320209994, -3717553.603945332],
      zoom: 14
    });
    
var mapa = new ol.Map({
    layers: [
      new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: ver,
    target: 'map'
  });

/************ Using d3js ************/

var edad;
d3.json("edad.json", function(err, data) {
  if (!err) {
    edad = data;
  }
});

var d3vars = {};

d3vars.body = d3.select('body');

d3vars.body
  .append('svg')
  .attr('width', 100)
  .attr('height', 100)
  .append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 50)
  .style('fill', 'gold');
