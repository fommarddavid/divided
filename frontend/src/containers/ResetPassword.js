import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import ResetPassword from '../components/ResetPassword';

// Action Creators
import {
  changeValue,
  resetPassword,
  setResetPasswordToken,
  getErrorMessage,
  setMailhasBeenSentOrReset,
  resetAuthField,
} from '../actions/auth';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state, ownProps) => {
  const { username } = ownProps.match.params;
  const { header } = ownProps.match.params;
  const { payload } = ownProps.match.params;
  const { signature } = ownProps.match.params;
  const token = `${header}.${payload}.${signature}`;

  return ({
    password: state.auth.password,
    confirmedPassword: state.auth.confirmedPassword,
    errorConnection: state.auth.errorConnection,
    errorMessages: state.auth.errorMessages,
    mailHasBeenSentOrReset: state.auth.mailHasBeenSentOrReset,
    mailConfirmationMessage: state.auth.mailConfirmationMessage,
    username,
    token,
  });
};

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  resetPassword: () => {
    dispatch(resetPassword());
  },
  setResetPasswordToken: (str1, str2) => {
    dispatch(setResetPasswordToken(str1, str2));
  },
  getErrorMessage: (bool, message) => {
    dispatch(getErrorMessage(bool, message));
  },
  setMailhasBeenSentOrReset: (bool, message) => {
    dispatch(setMailhasBeenSentOrReset(bool, message));
  },
  resetAuthField: () => {
    dispatch(resetAuthField());
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const ResetPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default ResetPasswordContainer;
