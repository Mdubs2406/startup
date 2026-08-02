const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';

const socket = new WebSocket(
  `${protocol}://${window.location.host}`
);

const handlers = [];

socket.onmessage = async (message) => {
  try {
    const event = JSON.parse(await message.data);

    for (const handler of handlers) {
      handler(event);
    }
  } catch (error) {
    console.error('Failed to parse WS message', error);
  }
};

export function addWebSocketHandler(handler) {
  handlers.push(handler);
}

export function removeWebSocketHandler(handler) {
  const index = handlers.indexOf(handler);

  if (index !== -1) {
    handlers.splice(index, 1);
  }
}