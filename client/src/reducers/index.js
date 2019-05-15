import { combineReducers} from 'redux';
import messageReducer from './messageReducer';
import socketReducer from './socketReducer';

export default combineReducers({
  message: messageReducer,
  socket: socketReducer,
});
