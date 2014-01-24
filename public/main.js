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

d3.csv('data/cp1-p_santa_fe.csv', function(err, data) {
  if (!err) {
    data = data.slice(1, data.length - 1);
    var virgula; 
    var barWidth = 40;
    var width = (barWidth + 10) * data.length;
    var height = 200;
    var widthScale = d3.scale.linear().domain([0, data.length]).range([0, width]);  
    var heightScale = d3.scale.linear().domain([0, d3.max(data, function(datum) { return parseInt(datum['Población 2010']); })]).range([0, height]);
    var body = d3.select('body');
    var graph = body.append('svg').attr('width', width).attr('height', height);
    var bars = graph.selectAll('rect').data(data).enter().append('svg:rect');
     
    bars.attr('x', function(datum, index) { return widthScale(index); })
      .attr('y', function(datum) { return height - heightScale(datum['Población 2010']); })
      .attr('height', function(datum) { return heightScale(datum['Población 2010']); })
      .attr('width', barWidth)
      .style('fill', 'red');
    
    var paragraphs = body.append('div').style('width', width + 'px').selectAll('p')
      .data(data)
      .enter()
      .append('p');
     
    paragraphs.attr('class', 'title')
      .style('display', 'inline')
      .text(function(datum, index) {
        if (datum.Departamento === 'La Capital') {
          virgula = index;
          d3.select(this).attr('class','title red-text');
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


/*
for (var i = 0; i < demografia.length; i++) {
  console.log(demografia[i].Departamento);
}
*/
