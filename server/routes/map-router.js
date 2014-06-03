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

function get(req,res) {
  var maps = new Array();
  var files = fs.readdirSync(dir);
  var i = 0;
  for (i; i < files.length; i++) {
    var file = fs.readFileSync(dir + files[i]);
    var map = JSON.parse(file);
    maps.push(map);
  }
  res.json(maps);
  console.log('Maps requested :' + maps);
}

router.route('/').get(get);

exports.routes = router;