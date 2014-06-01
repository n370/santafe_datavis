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
  
  var mapCollection = Collection.mapCollection;

  function render() {
    var geometries = this.collection.models[0].attributes.features;

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

    function zoomed() {
      d3.select(this)
        .attr('class', '');
    }

    var w = $('#map-container').css('width');
    var h = $('#map-container').css('height');

    var zoom = d3.behavior.zoom()
      .size([w,h])
      .scaleExtent([1,20]);

    zoom.on('zoom', zooming);
    zoom.on('zoomend', zoomed);

    var projection = d3.geo.mercator()
      .center([-57,-30.5])
      .scale(1000);

    var path = d3.geo.path()
    .projection(projection);

    // var departamentos = topojson.feature(geometries, geometries.objects['']);
    
    d3.select('#map-panel')
      .append('svg')
      .attr('id', 'map')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('id', 'layer')
      .call(zoom);

    d3.select('#layer').selectAll('path')
      .data(geometries)
      .enter()
      .append('g')
      .style("pointer-events", "all")
      .append("path")
      .attr("d", path);
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
      reset: true, 
      success: success, 
      error: error
    });
  }

  return { 
    mapView: function() {
      var mapView = Backbone.View.extend({
        collection: mapCollection,
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