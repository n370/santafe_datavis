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

var pg = require('pg'),
    fs = require('fs'),
    express = require('express'),
    server = express();

var router = express.Router();
router.route('/')
  .get(function(req,res) {
    var file = __dirname + '/database/judicial/geojson/america-continental.geojson';
    fs.readFile(file,function(err, data) {
      if (err) throw err;
      console.log(data);
      res.json(JSON.parse(data));
    })
  });

server.use('/', express.static(__dirname + '/public'));
server.use('/maps', router);

server.listen(1337);
console.log('Server running on port 1337');