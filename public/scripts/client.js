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

requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        // app: '../scripts',
        backbone: 'backbone/backbone',
        d3: 'd3/d3.min',
        jquery: 'jquery/dist/jquery.min',
        topojson: 'topojson/topojson',
        underscore: 'underscore/underscore'
    }
});

// Función principal de la aplicación
function client(backbone,d3,$,topojson,underscore) {

   


	$('#button-bars').click(function() {
  if ( $('#sub-navbar-top').is(':hidden') ) {
    $('#sub-navbar-top').slideDown();
    $(this).addClass('menu_item_selected');
  } else {
    $('#sub-navbar-top').slideUp();
    $(this).removeClass('menu_item_selected');
  }
});


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
}

// Inicializa la aplicación
requirejs(['backbone','d3','jquery','topojson','underscore'], client);