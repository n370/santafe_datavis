var body = document.body;

var ver = new ol.View2D({
      center: [-6757907.320209994, -3717553.603945332],
      zoom: 14
    });
    
var mapa = new ol.Map({
    layers: [
      new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: ver,
    target: 'map'
  });

/*d3.json("edad.json", function(err, data) {
  if (!err) {
    var edad = data;
  }
  return edad;
});*/
