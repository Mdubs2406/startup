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
}

module.exports = { peerProxy };