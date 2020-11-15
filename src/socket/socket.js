import { io } from 'socket.io-client';

const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://syncstream.southeastasia.cloudapp.azure.com'
    : 'http://localhost:8000';

let socket = io(SOCKET_URL);

export const initiateSocket = () => {
  socket = io(SOCKET_URL);
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const joinRoom = (roomid, user) => {
  socket.emit('JOIN_ROOM', { roomid, user });
};

export const leaveRoom = () => {
  socket.emit('LEAVE_ROOM');
};

export const subscribeNewJoin = callback => {
  socket.on('NEW_JOIN', data => callback(data));
};

export const subscribeMemberExit = callback => {
  socket.on('MEMBER_EXIT', data => callback(data));
};

export const subscribeRoomInfo = callback => {
  socket.on('ROOM_INFO', data => callback(data));
};

// TODO: REMOVE THIS CHAT STUDF
export const subscribe = cb => {
  if (!socket) return;
  socket.on('new chat msg', data => {
    cb(data);
  });
};

export const sendMessage = msg => {
  socket.emit('chat msg', msg);
};
