const {WebSocketServer, WebSocket } = require('ws');

function setUpWebSocket(httpServer) {
 const wsServer = new WebSocketServer({ server: httpServer });

 wsServer.on('connection', (connection) => {
  connection.alive = true;

  connection.on('pong', () => {
    connection.alive = true;
  });
 });

 wsServer.broadcast = (event) => {
  const message = JSON.stringify(event);

  for (const client of wsServer.clients) {
    if (client.readyState == WebSocket.OPEN) {
      client.send(message);
    }
  }
 }

 const heartbeat = setInterval(() => {
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
