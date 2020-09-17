import axios from 'axios';

import { LOGIN, REGISTER, setIsConnected } from '../actions/auth';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const state = store.getState();
      axios
        .post('http://localhost:3000/api/login', {
          email: state.auth.email,
          password: state.auth.password,
        })
        .then((response) => {
          if (response.data.token) {
            store.dispatch(setIsConnected(state.auth.isConnected));
          }
          sessionStorage.setItem('token', response.data.token);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case REGISTER: {
      const state = store.getState();
      axios
        .post('http://localhost:3000/api/register', {
          username: state.auth.username,
          email: state.auth.email,
          password: state.auth.password,
          confirmedPassword: state.auth.confirmedPassword,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
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
