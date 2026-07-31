const protocol = window.location.protocol === 'http' ? 'ws' : 'wss';

const socket = new WebSocket(
  `${protcol}://${window.location.host}`
);

const handlers = [];

socket.onmessage = async (message) => {
  const event = JSON.parse(await message.data);

  for (const handler of handlers) {
    handler(event);
  }
};

