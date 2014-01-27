/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

/************* Using ol3js  *************/

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
  target: 'map'
});

/************ Using d3js ************/

d3.csv('data/cp1-p_santa_fe.csv', function(err, data) {
  if (!err) {
    data.sort(function(a,b) {
      return d3.ascending(parseInt(a['Población 2010']), 
        parseInt(b['Población 2010']));
    });

    var virgula; 
    var barThickness = 20;
    var width = 960;
    var height = (barThickness + 5) * data.length;
    
    var widthScale = d3.scale.linear()
      .domain([0, d3.max(data, function(datum) { 
        return parseInt(datum['Población 2010']); 
      })])
      .range([0, width]);
    
    var heightScale = d3.scale.linear()
      .domain([0, data.length])
      .range([0, height]);  
    
    d3.select('body')
      .insert('div', 'script')
      .attr('id', 'graph_01')
      .attr('class', 'centered')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('svg:rect')
      .attr('x', 0)
      .attr('y', function(datum, index) { return heightScale(index); })
      .attr('height', barThickness)
      .attr('width', 0)
      .style('fill', function(datum, index) {
        if (index %  2 === 0) {
          return 'purple';
        }
        return 'blue';
      })
      .transition()
      .duration(2000)
      .attr('width', function(datum) { 
        return widthScale(datum['Población 2010']); 
      });
      
    d3.select('#graph_01')
      .append('div')
      .style('width', width + 'px')
      .selectAll('p')
      .data(data)
      .enter()
      .append('p')
      .attr('class', 'title')
      .style('display', 'inline')
      .text(function(datum, index) {
        if (datum.Departamento === 'La Capital') {
          virgula = index;
          d3.select(this).style('color', 'purple');
          return index + ' ' + datum.Departamento;
        }
        if (index === data.length - 1) {
          return index + ' ' + datum.Departamento + '.';
        } else if (index === virgula + 1) {
          return ', ' + index + ' ' + datum.Departamento + ', ';
        } else if (virgula + 1 === data.length - 1) {
          return ', ' + index + ' ' + datum.Departamento + '.';
        } else {
          return index + ' ' + datum.Departamento + ', '; 
        }
      });
  }
});
