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

var dependencies = ["collections/map-collection","d3","topojson"];

function Module(Collection,d3,topojson) {
  
  var collection = Collection.mapCollection;

  function randomRGBAString(a) { // El argumento a es un número entre 0 y 1 inclusive. 
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
      console.log(color_string);
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

    var w = $('#map-container').css('width');
    var h = $('#map-container').css('height');
   
    var zoom = d3.behavior.zoom()
      .size([w,h])
      .scaleExtent([1,20]);
    
    zoom.on('zoom', zooming);
    zoom.on('zoomend', zoomed);
    
    var mapas = this.collection.models;
    
    var svg = d3.select('#map-panel')
        .append('svg')
        .attr('class', 'full-width full-height');

    var layers = svg.append('g').attr('class', 'layers');

    var x = 0;
    for(x; x < mapas.length; x++) {

      var geometries = mapas[x].attributes.features;

      var projection = d3.geo.mercator()
        .center([-58,-30])
        .scale(5000);

      var path = d3.geo.path()
        .projection(projection);

      // var departamentos = topojson.feature(geometries, geometries.objects['']);

      layers.append('g')
        .attr('class', 'layer')
        .selectAll('path')
        .data(geometries)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('class', function(d) {
          return d.geometry.type;
        })
        .style('fill', function() {
          return randomRGBAString('0.2');
        });
    }

    layers.call(zoom);
  }
  
  function initialize() {
    
    function success(data) {
      console.log(data);
      that.render();
    }

    function error() {
      console.log('Error!');
    }

    var that = this;

    this.collection.fetch({ 
      // reset: true, 
      success: success, 
      error: error
    });
  }

  return { 
    mapView: function() {
      var mapView = Backbone.View.extend({
        collection: collection,
        events: {},
        initialize: initialize,
        render: render
      });

      var maps = new mapView();
      maps.initialize(); 
    }
  }
}

define(dependencies, Module);