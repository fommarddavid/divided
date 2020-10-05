// Action Types
import {
  CHANGE_VALUE,
  SET_IS_CONNECTED,
  GET_USER_DATAS,
  GET_ERROR_MESSAGE,
  SET_RESET_PASSWORD_TOKEN,
  SET_MAIL_HAS_BEEN_SENT_OR_RESET,
  RESET_AUTH_FIELD,
} from '../actions/auth';

// Initial State
const initialState = {
  userId: '',
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
  isConnected: false,
  errorConnection: false,
  errorMessages: [],
  resetPasswordToken: '',
  mailHasBeenSentOrReset: false,
  mailConfirmationMessage: '',
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
    case GET_ERROR_MESSAGE:
      return {
        ...state,
        errorConnection: action.bool,
        errorMessages: action.message,
      };
    case SET_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        username: action.str1,
        resetPasswordToken: action.str2,
      };
    case SET_MAIL_HAS_BEEN_SENT_OR_RESET:
      return {
        ...state,
        mailHasBeenSentOrReset: action.bool,
        mailConfirmationMessage: action.msg,
      };
    case RESET_AUTH_FIELD:
      return {
        ...state,
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
      };
    default:
      return state;
  }
};

export default authReducer;
