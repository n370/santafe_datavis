/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

var restify = require('restify'),
    pg = require('pg');

var server = restify.createServer({
	name: 'Santa Fe DataVis'
});

server.get(/\/?.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});