import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import ForgotPassword from '../components/ForgotPassword';

// Action Creators
import {
  changeValue,
  forgotPassword,
  getErrorMessage,
} from '../actions/auth';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  email: state.auth.email,
  errorConnection: state.auth.errorConnection,
  errorMessages: state.auth.errorMessages,
  mailHasBeenSentOrReset: state.auth.mailHasBeenSentOrReset,
  mailConfirmationMessage: state.auth.mailConfirmationMessage,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  forgotPassword: () => {
    dispatch(forgotPassword());
  },
  getErrorMessage: (bool, message) => {
    dispatch(getErrorMessage(bool, message));
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

export default ForgotPasswordContainer;
