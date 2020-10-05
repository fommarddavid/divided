// Types
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const GET_USER_DATAS = 'GET_USER_DATAS';
export const GET_ERROR_MESSAGE = 'GET_ERROR_MESSAGE';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SET_RESET_PASSWORD_TOKEN = 'SET_RESET_PASSWORD_TOKEN';
export const SET_MAIL_HAS_BEEN_SENT_OR_RESET = 'SET_MAIL_HAS_BEEN_SENT_OR_RESET';
export const RESET_AUTH_FIELD = 'RESET_AUTH_FIELD';

// Creators
export const changeValue = (name, value) => ({
  type: CHANGE_VALUE,
  name,
  value,
});

export const login = () => ({
  type: LOGIN,
});

export const register = () => ({
  type: REGISTER,
});

export const setIsConnected = (bool) => ({
  type: SET_IS_CONNECTED,
  bool,
});

export const getUserDatas = (email, username) => ({
  type: GET_USER_DATAS,
  email,
  username,
});

export const getErrorMessage = (bool, message) => ({
  type: GET_ERROR_MESSAGE,
  bool,
  message,
});

export const forgotPassword = () => ({
  type: FORGOT_PASSWORD,
});

export const resetPassword = () => ({
  type: RESET_PASSWORD,
});

export const setResetPasswordToken = (str1, str2) => ({
  type: SET_RESET_PASSWORD_TOKEN,
  str1,
  str2,
});

export const setMailhasBeenSentOrReset = (bool, msg) => ({
  type: SET_MAIL_HAS_BEEN_SENT_OR_RESET,
  bool,
  msg,
});

export const resetAuthField = () => ({
  type: RESET_AUTH_FIELD,
});
