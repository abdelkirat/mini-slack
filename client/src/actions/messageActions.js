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

export const addMessage = (message, socket) => dispatch => {
  socket.emit('sendMessage', message);
  // axios.post('/api/messages', message)
  //   .then(res =>
  //   dispatch({
  //     type: ADD_MESSAGE,
  //     payload: res.data
  //   }));
};

export const listenToIncomingMessages = socket => dispatch => {
  socket.on('newMessage', (message) => {
    console.log(message);
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
