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

var dependencies = ["models/circunscripciones-model","d3","topojson"];

function Module(Model,d3,topojson) {
  
  var model = Model.circunscripcionesModel;

  function render() {

    var w = $('#map-container').css('width');
    var h = $('#map-container').css('height');
   
    var circunscripciones = this.model;
    var layer = circunscripciones.attributes;

    var projection = d3.geo.mercator();
    var path = d3.geo.path().projection(projection);
    
    var svg = d3.select('#map-panel')
      .append('svg')
      .attr('class', 'full-width full-height');

    svg.selectAll('path')
      .data(layer.features)
      .enter()
      .append('path')
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

    this.model.fetch({ 
      reset: true, 
      success: success, 
      error: error
    });
  }

  return { 
    circunscripcionesView: function() {
      var View = Backbone.View.extend({
        model: model,
        events: {},
        initialize: initialize,
        render: render
      });

      var circunscripciones = new View();
      circunscripciones.initialize(); 
    }
  }
}

define(dependencies, Module);