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
    express = require('express');

var db_connection_string = 'postgres://developer:developer@localhost:5432/ipec_sf_2014';

function respond(req, res, next){
	pg.connect(db_connection_string, function(err, client, done) {
	  if(err) {
	    return console.error('Error fetching client from pool', err);
	  }
	  client.query('select * from entidades.departamentos', function(err, result) {
	    //call `done()` to release the client back to the pool
	    done();

	    if(err) {
	      return console.error('Error running query', err);
	    }
	    res.send(201, result.rows[0].rotulo);
	    return next();
	    //output: 1
	  });
	});
}

var server = express();

server.use('/', express.static(__dirname + '/public'));

server.listen(1337);

console.log('Server running on port 1337');