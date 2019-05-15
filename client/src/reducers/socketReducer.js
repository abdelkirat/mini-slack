import { INIT_SOCKET } from '../actions/types';

const initialState = {
  socket: null,

};

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state;
  }
};
