/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

/************* Using ol3js  *************/

var controle = new ol.Collection([ new ol.interaction.DragPan() ]);
  
var ver = new ol.View2D({
  center: [-6757907.320209994, -3717553.603945332],
  zoom: 14
});

var camada = [ new ol.layer.Tile({ source: new ol.source.OSM() }) ];
    
var mapa = new ol.Map({
  layers: camada,
  interactions: controle,
  view: ver,
  target: 'map'
});

/************ Using d3js ************/

var d3vars = {};

d3vars.body = d3.select('body');

/*
d3vars.graph = d3vars.body
  .append('svg')
  .attr('width', 100)
  .attr('height', 100);
d3vars.circle = d3vars.graph.append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 50)
  .style('fill', 'gold');
*/

d3.csv('data/cp1-p_santa_fe.csv', function(err, d) {
  if (!err) {
    d3vars.body.selectAll('p')
      .data(d)
      .enter()
      .append('p')
      .attr('class', 'title')
      .text(function(datum, index) { 
        if (datum.Departamento === 'La Capital') {
          d3.select(this).attr('class','title red-text');
          console.log(this);
        }
        return index + ' ' + datum.Departamento; 
      });
  }
});

/*
for (var i = 0; i < demografia.length; i++) {
  console.log(demografia[i].Departamento);
}
*/
