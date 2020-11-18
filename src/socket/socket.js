import { io } from 'socket.io-client';

const SOCKET_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://192.168.1.10:8000'
    : 'http://localhost:8000';
// ? 'https://syncstream.southeastasia.cloudapp.azure.com'

let socket = io(SOCKET_URL);

export const initiateSocket = () => {
  socket = io(SOCKET_URL);
};

export const getSocketId = () => {
  return socket.id;
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

export const sendChat = data => {
  socket.emit('CHAT_MESSAGE', data);
};

export const subscribeChatMessage = callback => {
  socket.on('CHAT_MESSAGE', data => callback(data));
};

export const addPlaylistItem = data => {
  socket.emit('PLAY_ADD', data);
};

export const subscribePlayAdd = callback => {
  socket.on('PLAY_ADD', data => callback(data));
};

export const deletePlaylistItem = data => {
  socket.emit('PLAY_DELETE', data);
};

export const subscribePlayDelete = callback => {
  socket.on('PLAY_DELETE', data => callback(data));
};

export const movePlaylistItemUp = data => {
  socket.emit('PLAY_UP', data);
};

export const subscribePlayUp = callback => {
  socket.on('PLAY_UP', data => callback(data));
};

export const movePlaylistItemDown = data => {
  socket.emit('PLAY_DOWN', data);
};

export const subscribePlayDown = callback => {
  socket.on('PLAY_DOWN', data => callback(data));
};

export const subscribeLoad = callback => {
  socket.on('LOAD', data => callback(data));
};

export const startVideo = () => {
  socket.emit('START');
};

export const subscribeSync = callback => {
  socket.on('SYNC', data => callback(data));
};

export const endVideo = data => {
  socket.emit('END', data);
};

export const pauseVideo = data => {
  socket.emit('PAUSE', data);
};

export const subscribePauseVideo = callback => {
  socket.on('PAUSE', data => callback(data));
};

export const playVideo = () => {
  socket.emit('PLAY');
};

export const subscribePlayVideo = callback => {
  socket.on('PLAY', () => callback());
};

export const subscribeCurrent = callback => {
  socket.on('CURRENT', data => callback(data));
};

export const sendCurrentRequest = () => {
  socket.emit('CURRENT');
};

export const removePlayerListeners = () => {
  socket.off('PLAY');
  socket.off('PAUSE');
  socket.off('SYNC');
  socket.off('LOAD');
};

export const promoteMember = data => {
  socket.emit('PROMOTE', data);
};

export const demoteMember = data => {
  socket.emit('DEMOTE', data);
};

export const subscribePromote = callback => {
  socket.on('PROMOTE', data => callback(data));
};

export const subscribeDemote = callback => {
  socket.on('DEMOTE', data => callback(data));
};

export const kickMember = data => {
  socket.emit('KICK', data);
};

export const subscribeKick = callback => {
  socket.on('KICK', () => callback());
};

export const renameRoom = data => {
  socket.emit('RENAME', data);
};

export const subscribeRename = callback => {
  socket.on('RENAME', data => callback(data));
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
