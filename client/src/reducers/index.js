import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import socketReducer from './socketReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  message: messageReducer,
  socket: socketReducer,
  error: errorReducer,
  auth: authReducer
});
