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

define(["../scripts/collections/map-collection","d3","topojson"], function(mapCollection,d3,topojson) { 
  function initialize() {
    
    var mapas = this.collection.model[0].features;

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
        .scale(4500);

      var path = d3.geo.path()
      .projection(projection);

      var departamentos = topojson.feature(mapas, mapas.objects['santafe-departamentos']);
      
      d3.select('#map-panel')
        .append('svg')
        .attr('id', 'map')
        .attr('width', '100%')
        .attr('height', '100%')
        .append('g')
        .attr('id', 'layer')
        .call(zoom);

      d3.select('#layer').selectAll('path')
        .data(mapas)
        .enter()
        .append('g')
        .attr('class', 'departamento')
        .style("pointer-events", "all")
        .append("path")
        .attr("id", getAndParse)
        .attr("d", path);
  } // End initialize
  
  mapCollection.mapCollection.fetch();

  console.log(mapCollection.mapCollection);

  return {
    mapView: Backbone.View.extend({
      collection: 'mapCollection.mapCollection',
  
      tagName: 'div',
    
      className: '',

      template: _.template($('#profile_card').html()),

      events: {
        click: 'change_color'
      },
      
      initialize: initialize,

      render: function() {
        this.$el.html(this.template(this.model.attributes)); // Pass an object to the template attribute.
        return this;
      },

      change_color: function() {
        this.$('h1').css('color', 'red');
      }
    })
  }
});