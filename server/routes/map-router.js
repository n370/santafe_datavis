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

var root = process.cwd();
var router = express.Router();
var dir = root + '/server/database/judicial/geojson/';
var layers = new stream.Readable;
var names = fs.readdirSync(dir);
var start = new Buffer('[');
var finish = new Buffer(']');

function get(req,res) {
  res.type('application/json');
  var i = 0;
  for (i; i < names.length; i++) {
    fs.readFile(dir + names[i], function(err, buf){
      if (err) {
        throw err;
      } else if (i === 0) {
        layers.push(start + buf);
        console.log('First layer pushed to stream');
      } else if (i === names.length - 1) {
        layers.push(buf + finish);
        console.log('Last layer pushed to stream');
        layers.push(null);
        console.log('Null pushed to readable stream');
        layers.pipe(res);
      } else {
        layers.push(buf);
        console.log('In-between layers pushed to stream');
      }
    });
  }
}

router.route('/').get(get);

exports.routes = router;