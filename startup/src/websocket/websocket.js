let socket;
const handlers = [];

export function connectWebSocket() {
  if (socket && 
    (socket.readyState === WebSocket.OPEN ||
    socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';

  socket = new WebSocket(
    `${protocol}://${window.location.host}/ws`
  );

  socket.onmessage = async (message) => {
    try {
      const event = JSON.parse(message.data);

      for (const handler of handlers) {
        handler(event);
      }
    } catch (error) {
      console.error('Failed to parse WS message', error);
    }
  };

  socket.onclose = () => {
    socket = null;
  };

  socket.onerror = (error) => {
    console.error('WebSocket error', error);
  }
}

export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

export function addWebSocketHandler(handler) {
  handlers.push(handler);
}

export function removeWebSocketHandler(handler) {
  const index = handlers.indexOf(handler);

  if (index !== -1) {
    handlers.splice(index, 1);
  }
}