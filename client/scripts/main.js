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
        "first": "Cesar",
        "last": "Hein"
      },  
      "email": ["chein@santafe.gov.ar"]
    },
    {
      "name": {
        "first": "Yenier",
        "last": "Barcelo"
      },  
      "email": ["ybarcelo@santafe.gov.ar"]
    }  
  ] 
}
*/

function resizeSVG(width, height) {
  this.width = width;
  this.height = height;
}

var width = $("#map-panel").width(),
  height = $("#map-panel").height(),
  topojsonPath = "database/judicial/topojson",
  circunscripcion,
  distrito;

var projection = d3.geo.mercator()
  .scale(5000)
  .center([-61, -32.3])
  .translate([width / 2, height / 1.5]);

var path = d3.geo.path()
  .projection(projection);
  
var svgSizes = new resizeSVG(width, height);

window.onresize = function() {
  svgSizes.width = $("#map-panel").width();
  svgSizes.height = $("#map-panel").height();
  $("#map-panel").css('width',svgSizes.width);
  $("#map-panel").css('height',svgSizes.height);
} 

var svg = d3.select("#map-panel").append("svg")
  .attr("viewBox", "0 0 " + svgSizes.width + " " + svgSizes.height)
  .attr("width", svgSizes.width)
  .attr("height", svgSizes.height);

svg.append("rect")
  .attr("class", "no-fill selectable")
  .attr("width", width)
  .attr("height", height)
  .on("click", circunscripcion_clicked);

var g = svg.append("g");
var circunscripciones_global;

var circunPath = topojsonPath + "/circunscripciones_judiciales.topojson";

d3.json(circunPath, function(error, circunscripciones) {

  circunscripciones_global = circunscripciones;
  g.append("g")
  .attr("id", "circunscripciones_judiciales")
  .attr("class", "selectable")
  .selectAll("path")
  .data(topojson.feature(circunscripciones, circunscripciones.objects.circunscripciones_judiciales).features)
  .enter()
  .append("path")
  .attr("id", function(d) { return d.properties.level+"-"+d.properties.id; })
  .attr("d", path)
  .on("click", circunscripcion_clicked);
  
  g.append("g")
  .attr("id", "circunscripciones_etiquetas")
  .selectAll(".etiqueta")
  .data(topojson.feature(circunscripciones, circunscripciones.objects.circunscripciones_judiciales).features)
  .enter().append("text")
  .attr("class", function(d) { return "etiqueta " + d.properties.id; })
  .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .text(function(d) { return d.properties.id; });


  referencias = '<h1>Referencias</h1><h4>Circunscripciones</h4><p>';
  $.each( circunscripciones.objects.circunscripciones_judiciales.geometries, function( key, value ) {
    referencias += '<strong>'+value.properties.id+'.</strong> '+value.properties.name+'<br/>';
  });
  
  referencias += '</p>';
  $('#referencias').html(referencias);

});

function zoom(xyz) {
  g.transition()
  .duration(750)
  .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
  .selectAll(["#circunscripciones_judiciales", "#distritos", "#cities"])
  .style("stroke-width", 1.0 / xyz[2] + "px")
  .selectAll(".city")
  .attr("d", path.pointRadius(20.0 / xyz[2]));
}

function get_xyz(d) {
  var bounds = path.bounds(d);
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = .96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
  return [x, y, z];
}

function circunscripcion_clicked(d) {
  g.selectAll(["#distritos", "#circuitos", "#circunscripciones_etiquetas", "#distritos_etiquetas", "#circuitos_etiquetas"]).remove();
  distrito = null;

  if (circunscripcion) {
    var level = circunscripcion.properties.level;
    var id = circunscripcion.properties.id;
    var htmlID = "#" + level + '-' + id; 
    g.selectAll(htmlID).style('display', null);
  }

  if (d && (circunscripcion !== d)) {
    var xyz = get_xyz(d);
    circunscripcion = d;
    
    if (d.properties.id  === '1') {
      var distPath = topojsonPath + "/distritos_judiciales.topojson";
      
      d3.json(distPath, function(error, distritos) {
        var obj = distritos.objects.distritos_judiciales;
        
        var topo = topojson.feature(distritos, obj);

        function filterMe(d) {
          if(d.properties.group) {
            var level = d.properties.group.level;
            var id = d.properties.group.id;
            return level === 'circunscripcion' && id === '1';
          }
        }
        
        function makeID(d) {
          return d.properties.level + "-" + d.properties.id;
        }

        g.append("g")
          .attr("id", "distritos")
          .attr("class", "selectable")
          .selectAll("path")
          .data(topo.features.filter(filterMe))
          .enter()
          .append("path")
          .attr("id", makeID)
          .attr("class", "active")
          .attr("d", path)
          .on("click", distrito_clicked);

        g.append("g")
          .attr("id", "distritos_etiquetas")
          .selectAll(".etiqueta-distrito")
          .data(topo.features.filter(filterMe))
          .enter().append("text")
          .attr("class", function(d) { return "etiqueta-distrito " + d.properties.id; })
          .attr("id",  function(d) { return "distrito-" + d.properties.id; })
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
          .attr("dy", ".25em")
          .text(function(d) { return d.properties.id; });

        zoom(xyz);

        g.selectAll("#" + d.id).style('display', 'none');       

        referencias = '<h1>Referencias</h1><h4>Distritos</h4><p>';
        $.each( topo.features.filter(filterMe), function( key, value ) {
          referencias += '<strong>'+value.properties.id+'.</strong> '+value.properties.name+'<br/>';
        });
        
        referencias += '</p>';
        $('#referencias').html(referencias);

      });
    } else {
      zoom(xyz);
    }
  } else {
    var xyz = [width / 2, height / 1.5, 1];
    
    circunscripcion = null;
    
    g.append("g")
      .attr("id", "circunscripciones_etiquetas")
      .selectAll(".etiqueta")
      .data(topojson.feature(circunscripciones_global, circunscripciones_global.objects.circunscripciones_judiciales).features)
      .enter().append("text")
      .attr("class", function(d) { return "etiqueta " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.id; });
    
    referencias = '<h1>Referencias</h1><h4>Circunscripciones</h4><p>';
    $.each( circunscripciones_global.objects.circunscripciones_judiciales.geometries, function( key, value ) {
      referencias += '<strong>'+value.properties.id+'.</strong> '+value.properties.name+'<br/>';
    });
    
    referencias += '</p>';
    $('#referencias').html(referencias);

    zoom(xyz);
  }
} // Closes circunscription_clicked.

function distrito_clicked(d) {
  g.selectAll(["#cities", "#distritos_etiquetas", "#circuitos_etiquetas"]).remove();

  if (d && distrito !== d) {
    var xyz = get_xyz(d);
    distrito = d;

    var circuiPath = topojsonPath + "/circuitos_judiciales.topojson";
    
    d3.json(circuiPath, function(error, circuitos) {
      var obj = circuitos.objects.circuitos_judiciales;
      
      var topo = topojson.feature(circuitos, obj);
      
      function filterMe(d) {
        if(d.properties.group) {
          var level = d.properties.group.level;
          var id = d.properties.group.id;
          return level === 'distrito' && id === '1';
        }
      }
      
      function makeID(d) {
        return d.properties.level + "-" + d.properties.id;
      }

      g.append("g")
        .attr("id", "circuitos")
        .selectAll("path")
        .data(topo.features.filter(filterMe))
        .enter()
        .append("path")
        .attr("id", makeID)
        .attr("class", "circuito")
        .attr("d", path.pointRadius(20 / xyz[2]));

      g.append("g")
        .attr("id", "circuitos_etiquetas")
        .selectAll(".etiqueta-circuiros")
        .data(topo.features.filter(filterMe))
        .enter().append("text")
        .attr("class", function(d) { return "etiqueta-circuito " + d.properties.id; })
        .attr("id",  function(d) { return "circuito-" + d.properties.id; })
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".15em")
        .text(function(d) { return d.properties.id; });

      zoom(xyz);

      referencias = '<h1>Referencias</h1><h4>Circuitos</h4><p>';
      $.each( topo.features.filter(filterMe), function( key, value ) {
        referencias += '<strong>'+value.properties.id+'.</strong> '+value.properties.name+'<br/>';
      });
      
      referencias += '</p>';
      $('#referencias').html(referencias);

    });      
  } else {
    distrito = null;
    circunscripcion_clicked(circunscripcion);
  }
}  // Closes distrito_clicked.

$(window).resize(function() {
  var w = $("#map-panel").width();
  svg.attr("width", w);
  svg.attr("height", w * height / width);
});