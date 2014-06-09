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

var express = require('express'),
    fs = require('fs'),
    exports = module.exports = {};

var root = process.cwd();
var router = express.Router();
var dir = root + '/server/database/judicial/geojson/';
var names = fs.readdirSync(dir);

function get(req,res) {
  var layers = new Array();
  var i = 0;
  for (i; i < names.length; i++) {
    var stat = fs.statSync(dir + names[i]);
    if (stat.isDirectory() !== true) {
      var isJSON = true;
      var buf = fs.readFileSync(dir + names[i]);
      try {
        JSON.parse(buf);
      } catch (err) {
        console.log("not JSON");
        isJSON = false
      }
      if (isJSON !== false) {
        var geojson = JSON.parse(buf);
        var start = 0;
        var end = names[i].length - 8;
        geojson.name = names[i].substr(start, end);
        console.log('geojson ready');
        layers.push(geojson); 
      }
    }
  }
  res.json(layers);
}

router.route('/').get(get);

exports.routes = router;