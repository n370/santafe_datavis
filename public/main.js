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

var test;

d3.json('data/santafe-departamentos.topojson', function (error, data) {
  test = data;
  console.log(test);
  var width = 960,
      height = 400;
  
  var svg = d3.select('body').append('div')
      .attr('class', 'centered')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  var projection = d3.geo.mercator()
      .center([-61, -31.2])
      .scale(2500)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var departamentos = topojson.feature(data, data.objects['santafe-departamentos']);

  svg.selectAll(".departamento")
    .data(departamentos.features)
    .enter()
    .append("path")
    .attr("class", function(datum) { 
      var id = datum.id.toLowerCase();
      id = id.split(' ');
      id = id.join('_');
      return "departamento " + id; 
    })
    .attr("d", path);

});

d3.csv('data/cp1-p_santa_fe.csv', function(err, data) {
  if (!err) {

    // Convert strings to numbers.
    data.forEach(function(datum) {
      datum['Población 2001'] = parseInt(datum['Población 2001']);
      datum['Población 2010'] = parseInt(datum['Población 2010']);
    });
    
    // Sort data ascending by 'Población 2010'.
    data.sort(function(a,b) {
      return d3.ascending(a['Población 2010'], b['Población 2010']);
    });

    var virgula; 
    var margin = {
      top: 70, 
      right: 30, 
      bottom: 70, 
      left: 120
    };
    var barWeight = 15;
    var width = 960 - margin.left - margin.right;
    var height = (barWeight + 5) * data.length;
    var max_p2010 = d3.max(data, function(datum) {
      return datum['Población 2010'];
    }); 
    var widthScale = d3.scale.linear()
      .domain([0, max_p2010])
      .range([0, width]);
    
    var heightScale = d3.scale.linear()
      .domain([0, data.length])
      .range([0, height]);  
    
    var xAxis = d3.svg.axis()
      .scale(widthScale)
      .tickSize(-height)
      .tickFormat(function(datum) { return (datum / 1e6) + "M"; });
    
    var graph_01 = d3.select('body')
      .insert('div', 'script')
      .attr('id', 'graph_01')
      .attr('class', 'centered')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var title = d3.select('svg')
      .append('text')
      .attr('class', 'title')
      .attr('y', 20);
    title
      .append('tspan')
      .attr('x', 20)
      .attr('dy', 15)
      .text('Provincia de Santa Fe. Años 2001-2010');
    title
      .append('tspan')
      .attr('x', 20)
      .attr('dy', 18)
      .text('Población total y variación intercensal absoluta y relativa por departamento'); 

    graph_01
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + 0 + ',' + height + ')')
      .call(xAxis);
    
    graph_01
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('svg:rect')
      .attr('x', 0)
      .attr('y', function(datum, index) { return heightScale(index); })
      .attr('height', barWeight)
      .attr('width', 0)
      .style('fill', function(datum, index) {
        if (index %  2 === 0) {
          return 'rgba(163,222,255,1)';
        }
        return 'rgba(140,172,232,1)';
      })
      .transition()
      .duration(2000)
      .attr('width', function(datum) { 
        return widthScale(datum['Población 2010']); 
      });

    graph_01
      .append('g')
      .attr('transform', 'translate(' + -100 + ',' + 0 + ')')
      .attr('class', 'y label')
      .selectAll('text')
      .data(data)
      .enter()  
      .append('text')
      .attr('dy', '0.4em')
      .attr('y', function(datum, index) { return heightScale(index) + (barWeight / 2)})
      .text(function(datum) { return datum.Departamento })
    var notes = d3.select('svg')
      .append('text')
      .attr('class', 'notes')
      .attr('y', height + margin.top);
    notes
      .append('tspan')
      .attr('x', 20)
      .attr('dy', 35)
      .text('Nota: la población total incluye a las personas viviendo en situación de calle.');
    notes
      .append('tspan')
      .attr('x', 20)
      .attr('dy', 13)
      .text('Fuente: INDEC. Censo Nacional de Población, Hogares y Viviendas 2001 y 2010.'); 

  function update() {
    
}
  }
});
