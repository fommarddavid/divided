import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import Login from 'src/components/Login';

// Action Creators
import {
  changeValue,
  login,
  getErrorMessage,
} from '../actions/auth';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  errorConnection: state.auth.errorConnection,
  errorMessages: state.auth.errorMessages,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  login: () => {
    dispatch(login());
  },
  getErrorMessage: (bool, message) => {
    dispatch(getErrorMessage(bool, message));
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
