import { INIT_SOCKET } from './types';
import socketIOClient from 'socket.io-client'

export const initSocket = () => dispatch => {
  const socket = socketIOClient('http://localhost:5000');
  socket.on('connection');
  dispatch({
    type: INIT_SOCKET,
    payload: socket
  });

  return socket;
};
