const protocol = window.location.protocol === 'http' ? 'ws' : 'wss';

const socket = new WebSocket(
  `${protcol}://${window.location.host}`
);

const handlers = [];

socket.onmessage = aysnc (message) => {
  const event = JSON.parse(await message.data.text());

  for (const handler of handlers) {
    handler(event);
  }
};
