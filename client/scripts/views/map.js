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

var dependencies = ["backbone","d3","topojson",'scripts/d3-utilities'];

function Module(Backbone,d3,topojson,util) {

  function initialize() {

    function zooming() {
      var translate = d3.event.translate;
      var scale = d3.event.scale;
      var str = "translate(" + translate + ")scale(" + scale + ")";
      d3.select(this)
        .attr("class", "zooming") 
        .attr("transform", str);
    }

    function zoomed() {}
    
    var w = $('#map-panel').css('width');
    var h = $('#map-panel').css('height');
    
    var layer = this.model.attributes;

    var projection = d3.geo.mercator()
      .center([-58,-30])
      .scale(5000);

    var path = d3.geo.path()
      .projection(projection);
    
    var zoom = d3.behavior.zoom()
      .size([w,h])
      .scaleExtent([1,20])
      .on('zoom', zooming)
      .on('zoomend', zoomed);
    
    var layers = d3.select('#map-panel svg g');
    
    layers.call(zoom);

    layers.append('g')
      .attr('id', layer.name)
      .attr('class', function() {
        if (layer.name === 'america_continental') {
          return 'layer';
        } else if (layer.name === 'provincias_argentinas') {
          return 'layer';
        } else if (layer.name === 'departamentos_santafe') {
          return 'layer';
        } else {
          return 'layer hidden';
        }
      })
      .selectAll('path')
      .data(layer.features)
      .enter()
      .append("path")
      .style('fill', function() {
        var str = util.randomRGBAString('0.6');

        if (layer.name === 'america_continental') {
          return 'rgba(20,20,20,0.1 )';
        } else if (layer.name === 'provincias_argentinas') {
          return 'rgba(50,50,50,0.2)';
        } else if (layer.name === 'departamentos_santafe') {
          return 'rgba(80,80,80,0.3)';
        } else {
          return str;
        } 
      })
      .style('stroke', function() {
        if (layer.name === 'provincias_argentinas') {
          return 'rgba(0,0,0,1)';
        } else if (layer.name === 'departamentos_santafe') {
          return 'rgba(100,100,100,1)';
        } 
      })
      .attr('id', function(d) {
        if (d.properties.rotulo) {
          return d.properties.rotulo;
        } else {
          return null;
        }
      })
      .attr("d", path);
  }

  var View = Backbone.View.extend({
    events: { },
    initialize: initialize,
  })
  
  return { 
    Map: View
  }
}

define(dependencies, Module);