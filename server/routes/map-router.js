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
    stream = require('stream'),
    exports = module.exports = {};

var layers = new stream.Readable;
var root = process.cwd();
var router = express.Router();
var dir = root + '/server/database/judicial/geojson/';
var names = fs.readdirSync(dir);

layers._read = function () {
  var i = 0;
  for (i; i < names.length; i++) {
    if (i === 0) { layers.push('[', 'utf8') }
    fs.readFile(dir + names[i], function(err, buf) {
      if (err) throw err;
      layers.push(buf + ',', 'utf8');
    });
    if (i < names.length - 1) layers.push(']', 'utf8'); layers.push(null);
  }
}

function get(req,res) {
  res.type('application/json');
  layers.pipe(res);
}

router.route('/').get(get);

exports.routes = router;