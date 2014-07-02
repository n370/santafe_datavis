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

var clientFiles = express.static('./', {
  'index': ['client/main.html', 'client/main.htm']
});

var serverFiles = express.static('./server');

server.use('/', clientFiles);
server.use('/server', serverFiles);

server.listen(1337);
console.log('HTTP server running on port 1337');