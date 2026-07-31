const protocol = window.location.protocol === 'http' ? 'ws' : 'wss';

const socket = new WebSocket(
  `${protcol}://${window.location.host}`
);

const handlers = [];