// Action Types
import { CHANGE_VALUE, SET_IS_CONNECTED, GET_USER_DATAS } from '../actions/auth';

// Initial State
const initialState = {
  userId: '',
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
  isConnected: false,
};

// Reducer
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnected: !action.bool,
      };
    case GET_USER_DATAS:
      return {
        ...state,
        username: action.username,
        email: action.email,
      };

    default:
      return state;
  }
};

export default authReducer;
