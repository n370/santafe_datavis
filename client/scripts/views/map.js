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

var dependencies = ["d3","topojson",'scripts/d3-utilities'];

function Module(d3,topojson,util) {

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
   
    var zoom = d3.behavior.zoom()
      .size([w,h])
      .scaleExtent([1,20]);
    
    zoom.on('zoom', zooming);
    zoom.on('zoomend', zoomed);
    
    var projection = d3.geo.mercator()
      .center([-58,-30])
      .scale(5000);

    var path = d3.geo.path()
      .projection(projection);
    
    var svg = d3.select('#map-panel')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%'); // Pasar para otro lado.

    var layers = svg.append('g').attr('class', 'layers');
    layers.call(zoom); // Esto también.

    var layer = this.model.attributes;

    layers.append('g')
      .attr('id', layer.name)
      .attr('class', 'layer')
      .selectAll('path')
      .data(layer.features)
      .enter()
      .append("path")
      .style('fill', function() { 
        var str = util.randomRGBAString('0.1');
        return str; 
      })
      .attr('id', function(d) {
        if (d.properties.rotulo) {
          return d.properties.rotulo;
        } else {
          return null;
        }
      })
      .attr('class', function(d) {
        if (d.properties.rotulo) {
          return 'feature';
        } else {
          return 'feature';
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