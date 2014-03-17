/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

var restify = require('restify'),
    pg = require('pg');

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


var server = restify.createServer({
	name: 'Santa Fe DataVis'
});

//server.get(/\/?.*/, restify.serveStatic({
//  directory: './public',
//  default: 'main.html'
//}));

server.get('/provincia', respond);

server.listen(1337, function () {
	console.log('%s listening at %s', server.name, server.url);
});