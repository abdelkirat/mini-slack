import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

const initalState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_ERRORS:
      const { msg, status, id } = action.payload;

      return {
        msg, status, id
      };

    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
};
