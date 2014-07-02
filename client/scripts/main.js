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

var m_width = $("#map-panel").width(),
  width = 640,
  height = 930,
  topojsonPath = "database/judicial/topojson",
  circunscripcion,
  distrito;

var projection = d3.geo.mercator()
  .scale(7000)
  .center([-61, -32.3])
  .translate([width / 2, height / 1.5]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("#map-panel").append("svg")
  .attr("preserveAspectRatio", "xMidYMid")
  .attr("viewBox", "0 0 " + width + " " + height)
  .attr("width", m_width)
  .attr("height", m_width * height / width);

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
  .text(function(d) { return d.properties.name; });

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
  g.selectAll(["#distritos", "#circuitos", "#circunscripciones_etiquetas"]).remove();
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

        zoom(xyz);

        g.selectAll("#" + d.id).style('display', 'none');       
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
      .text(function(d) { return d.properties.name; });
    
    zoom(xyz);
  }
} // Closes circunscription_clicked.

function distrito_clicked(d) {
  g.selectAll("#cities").remove();

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

      zoom(xyz);
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