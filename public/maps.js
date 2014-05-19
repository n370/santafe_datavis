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

function getCssPropertyNumber(selector, property) {
  var result = new String();
  var val = $(selector).css(property);
  for (var i = 0; i < val.length; i++ ) {
    var digit = parseInt(val[i]);
    if (digit <= 9) {
      result = result + digit;
    } 
  }
  return parseInt(result);
}

d3.json('data/santafe-departamentos.topojson', function (error, data) {

function getAndParse(provincia) { 
      var id = provincia.id.toLowerCase();
      id = id.split(' ');
      id = id.join('_');
      return id; 
    }

 var w = $('#map-container').css('width');
 var h = $('#map-container').css('height');

var zoom = d3.behavior.zoom()
    .size([w,h])
    .scaleExtent([1,20])
    .on('zoom', function () {
      d3.select(this)
      .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); });

  var projection = d3.geo.mercator()
      .center([-57,-30.5])
      .scale(4500);

  var path = d3.geo.path()
      .projection(projection);

  var departamentos = topojson.feature(data, data.objects['santafe-departamentos']);
  
  d3.select('#map-panel')
    .append('svg')
    .attr('id', 'map')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('g')
    .attr('id', 'layer')
    .call(zoom);

  d3.select('#layer').selectAll('path')
    .data(departamentos.features)
    .enter()
    .append('g')
    .attr('class', 'departamento')
    .style("pointer-events", "all")
    .append("path")
    .attr("id", getAndParse)
    .attr("d", path);
});