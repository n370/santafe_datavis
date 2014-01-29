/*
Author: Dylson 'n370' Valente Neto
Email: dvalenteneto@santafe.gov.ar
*/

var url = require('url');
var fs = require('fs');

module.exports = function routes(req, res) {
  if (req.url === '/') {
    fs.createReadStream(__dirname + '/public' + '/index.html').pipe(res);
  } else if (req.url === '/edad.json') {
    fs.createReadStream(__dirname + '/public' + '/edad.json').pipe(res);
  } else if (req.url === '/main.js') {
    fs.createReadStream(__dirname + '/public' + '/main.js').pipe(res);
  } else if (req.url === '/style.css') {
    fs.createReadStream(__dirname + '/public' + '/style.css').pipe(res);
  } else if (req.url === '/data/cp1-p_santa_fe.csv') {
    fs.createReadStream(__dirname + '/public' + '/data/cp1-p_santa_fe.csv').pipe(res);
  } else if (req.url === '/data/santafe-provincia.topojson') {
    fs.createReadStream(__dirname + '/public' + '/data/santafe-provincia.topojson').pipe(res);
  } else {  
    res.end('404', '404');
  }
}
