import axios from 'axios';
import { MESSAGES_LOADING, ADD_MESSAGE, DELETE_MESSAGE, GET_MESSAGES, EDIT_MESSAGES, RECEIVED_INCOMMING_MESSAGE } from './types';

export const getMessages = () => dispatch => {
  dispatch(setMessagesLoading());
  axios
    .get('/api/messages')
    .then(res => {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    });
};

export const addMessage = (message, socket) => {
  socket.emit('sendMessage', message);
};

export const listenToIncomingMessages = socket => dispatch => {
  socket.on('newMessage', (message) => {
    dispatch({
      type: RECEIVED_INCOMMING_MESSAGE,
      payload: message
    })
  });
};

export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING
  };
};
