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
    server = express();

var mapRoutes = require('./routes/map-router').routes;

var staticFiles = express.static('./client', {
  'index': ['main.html', 'main.htm']
});

server.use('/', staticFiles);
server.use('/maps', mapRoutes);

server.listen(1337);
console.log('HTTP server running on port 1337');