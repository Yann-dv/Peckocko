"use strict";

var http = require('http'); // package http de node -> permet de créer le server


var app = require('./app'); // import app


var normalizePort = function normalizePort(val) {
  // renvoie un port valide
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port); // on set le port sur laquelle l'app doit tourner

var errorHandler = function errorHandler(error) {
  // recherche les différentes erreurs et les gère de manière appropriée.
  // Elle est ensuite enregistrée dans le serveur ;
  if (error.syscall !== 'listen') {
    throw error;
  }

  var address = server.address();
  var bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var server = http.createServer(app); // -> fonction qui créer le server, prend la fonction app en argument

server.on('error', errorHandler);
server.on('listening', function () {
  //écouteur d'évènements est enregistré, 
  //consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
  var address = server.address();
  var bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
server.listen(port);