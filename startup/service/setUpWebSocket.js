const {WebSocketServer, WebSocket } = require('ws');
const cookieParser = require('cookie');
const DB = require('./database');

function setUpWebSocket(httpServer) {
 const wsServer = new WebSocketServer({ noServer: true });

 httpServer.on('upgrade', async (req, socket, head) => {
  try {
    const cookie = cookieParser.parse(req.headers.cookie || '');
    const authToken = cookie.authKey;

    if (!authToken) {
      socket.write('Unathorized');
      socket.destroy();
      return;
    }

    const user = await DB.getUserByToken(authToken);

    if (!user) {
      socket.write('Unauthorized');
      socket.destroy();
      return;
    }

    wsServer.handleUpgrade(req, socket, head, (connection) => {
      connection.user = user;

      wsServer.emit('connection', connection, req);
    })
  } catch (error) {
    console.error('WebSocket authentication error:', error);
    socket.destroy();
  }
 });

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

    try {
      connection.ping();
    } catch (error) {
      connection.terminate();
    }
  }
 }, 10000);

 wsServer.on('close', () => {
  clearInterval(heartbeat);
 });

 return wsServer;
}

module.exports = { setUpWebSocket };
