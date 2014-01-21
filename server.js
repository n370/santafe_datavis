/*** Import modules ***/
var routes = require('./routes');
var httpServer = require('http').createServer(routes);

/*** Initialize server ***/
httpServer.listen(1337);

/*** Log process events ***/
console.log('['+Date()+'] Single threaded Node.js process successfully started');
console.log('['+Date()+'] HTTP server listening on localhost:1337');
process.on('SIGINT', function() {
  console.log('['+Date()+'] Terminating process');
  process.exit();
});
