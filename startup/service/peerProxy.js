const {WebSocketServer, webSocket } = require('ws');

function seUpWebSocket(httpServer) {
 const wsServer = new WebSocketServer({ server: httpServer });

 wsServer.on('connection', (connection) => {
  connection.alive = true;

  connection.on('pong', () => {
    connection.alive = true;
  });

  connection.on('message', (message) => {
    for (const otherConnection of wsServer.clients) {
      if (otherConnection !== connection && otherConnection.readyState === 1) {
        otherConnection.send(message);
      }
    }
  });
 });

 const hearbeat = setInterval(() => {
  for (const connection of wsServer.clients) {
    if (!connection.alive) {
      connection.terminate();
      continue;
    }

    connection.alive = false;
    connection.ping();
  }
 }, 10000);

 wsServer.on('close', () => {
  clearInterval(heartbeat);
 });

 return wsServer;
}

module.exports = { setUpWebSocket };