// Types
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED';
export const GET_USER_DATAS = 'GET_USER_DATAS';

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
