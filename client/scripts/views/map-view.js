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

var dependencies = ["collections/map-collection","views/control","d3","topojson"];

function Module(Collection,control,d3,topojson) {
  
  var collection = Collection.mapCollection;

  // El argumento a es un número entre 0 y 1 inclusive, depende de D3. 
  function randomRGBAString(a) { 
    var colorScale = d3.scale.linear()
      .domain([0, 10])
      .range([0, 255]);
    var i = 0;
    var v = new Array();
    for (i; i < 3; i++) {
      var n = Math.floor((Math.random() * 10) + 1);
      v.push(Math.floor(colorScale(n)));
    }
    if (a) {
      var color_string = 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ','+ a + ')';
      return color_string;
    } else {
      console.error('ERR : No alpha string value was passed as an argument');
      return null;
    }
  }

  function render() {

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
    
    function getAndParse(provincia) { 
      var id = provincia.id.toLowerCase();
      id = id.split(' ');
      id = id.join('_');
      return id; 
    }

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

    var models = this.collection.models;
    
    var svg = d3.select('#map-panel')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    var layers = svg.append('g').attr('class', 'layers');
    
    var x = 0;
    for(x; x < this.collection.length; x++) {

      var layer = models[x].attributes;

      layers.append('g')
        .attr('id', layer.name)
        .attr('class', 'layer')
        .selectAll('path')
        .data(layer.features)
        .enter()
        .append("path")
        .style('fill', function() { return randomRGBAString('1') })
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

    layers.call(zoom);
  }
  
  function initialize() {
    var that = this;
    var thatControl = control; // Import control to initialize's scope.

    function success(collection) {
      var ctrl = new thatControl.Control();
      ctrl.names = collection.models;

      that.render();
      ctrl.render();
    }

    function error() {
      console.log('Error!');
    }

    this.collection.fetch({ 
      success: success, 
      error: error
    });
  }

  return { 
    mapView: Backbone.View.extend({
      collection: collection,
      events: { },
      initialize: initialize,
      render: render
    })
  }
}

define(dependencies, Module);