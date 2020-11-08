import { io } from 'socket.io-client';

const SOCK_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://syncstream.southeastasia.cloudapp.azure.com'
    : 'http://localhost:8000';

let socket = io(SOCK_URL);

export const initiateSocket = () => {
  socket = io(SOCK_URL);
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribe = cb => {
  if (!socket) return;
  socket.on('new chat msg', data => {
    cb(data);
  });
};

export const sendMessage = msg => {
  socket.emit('chat msg', msg);
};
