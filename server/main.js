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

var fs = require('fs'),
    express = require('express'),
    server = express();

var mapRoutes = require('./routes/map-router').routes;

server.use('/', express.static('./client'));
server.use('/maps', mapRoutes);

server.listen(1337);
console.log('Server running on port 1337');