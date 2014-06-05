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
var dir = root + '/server/database/judicial/geojson/';
var router = express.Router();

function get(req,res) {
  fs.readFile(dir + 'circunscripciones-judiciales.json', function(err, buf) {
    if (err) throw err;
    res.json(JSON.parse(buf));
  });
}

router.route('/circunscripciones').get(get)

exports.routes = router;