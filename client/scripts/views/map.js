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