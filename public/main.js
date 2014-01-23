/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/
var middleWidth = window.innerWidth / 2;

window.onresize = function() {
  middleWidth = window.innerWidth / 2;
}

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

d3vars.linearScale = d3.scale.linear()
  .domain([0,5000000])
  .range([0,200]);

d3vars.graph = d3vars.body
  .append('svg')
  .attr('width', '100%')
  .attr('height', '400px');

d3.csv('data/cp1-p_santa_fe.csv', function(err, data) {
  if (!err) {
    d3vars.graph.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', middleWidth)
      .attr('cy', 200)
      .attr('r', function(datum) { return d3vars.linearScale(datum['Población 2010']) })
      .style('stroke', 'gold')
      .style('fill-opacity', '0');
    var virgula; 
    d3vars.body.selectAll('p')
      .data(data)
      .enter()
      .append('p')
      .attr('class', 'title')
      .style('display', 'inline')
      .text(function(datum, index) { 
        if (datum.Departamento === 'La Capital') {
          d3.select(this)
            .attr('class','title red-text');
          d3.select(this).innerHTML = '<p class="title">, </p>';
          return index + ' ' + datum.Departamento + '</p>';
        }
        if (index === data.length - 1) {
          return index + ' ' + datum.Departamento + '.';
        } else {
          return index + ' ' + datum.Departamento + ', '; 
        }
      });
  }
});


/*
for (var i = 0; i < demografia.length; i++) {
  console.log(demografia[i].Departamento);
}
*/
