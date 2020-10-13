import axios from 'axios';

import {
  LOGIN,
  REGISTER,
  setIsConnected,
  getErrorMessage,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  setMailhasBeenSentOrReset,
} from '../actions/auth';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const state = store.getState();
      axios
        .post(`${process.env.URL_API}/login`, {
          email: state.auth.email,
          password: state.auth.password,
        })
        .then((response) => {
          if (response.data.token) {
            store.dispatch(setIsConnected(state.auth.isConnected));
            sessionStorage.setItem('token', response.data.token);
          }
        })
        .catch((error) => {
          // console.error(error.response.data);
          store.dispatch(getErrorMessage(error.response.data.error, error.response.data.messages));
        });
      break;
    }
    case REGISTER: {
      const state = store.getState();
      axios
        .post(`${process.env.URL_API}/register`, {
          username: state.auth.username,
          email: state.auth.email,
          password: state.auth.password,
          confirmedPassword: state.auth.confirmedPassword,
        })
        .then((response) => {
          if (response.data.message) {
            window.location.href = '/';
          }
        })
        .catch((error) => {
          // console.error(error);
          store.dispatch(getErrorMessage(error.response.data.error, error.response.data.messages));
        });
      break;
    }
    case FORGOT_PASSWORD: {
      const state = store.getState();
      axios
        .post(`${process.env.URL_API}/password/forgot`, {
          email: state.auth.email,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            store.dispatch(setMailhasBeenSentOrReset(response.data.success, response.data.message));
          }
        })
        .catch((error) => {
          // console.error(error);
          store.dispatch(getErrorMessage(error.response.data.error, error.response.data.messages));
        });
      break;
    }
    case RESET_PASSWORD: {
      const state = store.getState();
      axios
        .post(`${process.env.URL_API}/password/reset`, {
          username: state.auth.username,
          password: state.auth.password,
          confirmedPassword: state.auth.confirmedPassword,
          token: state.auth.resetPasswordToken,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.success) {
            store.dispatch(setMailhasBeenSentOrReset(response.data.success, response.data.message));
          }
        })
        .catch((error) => {
          store.dispatch(getErrorMessage(
            error.response.data.error,
            error.response.data.messages,
          ));
        });
      break;
    }

    default:
      break;
  }
  // On passe au suivant
  next(action);
};

export default authMiddleware;
