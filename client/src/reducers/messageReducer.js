import { ADD_MESSAGE, GET_MESSAGES, MESSAGES_LOADING, RECEIVED_INCOMMING_MESSAGE } from '../actions/types';

const initialState = {
  messages: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true
      };
    case RECEIVED_INCOMMING_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};
