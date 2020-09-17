import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import Register from 'src/components/Register';

// Action Creators
import { changeValue, register } from '../actions/auth';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  email: state.auth.email,
  username: state.auth.username,
  password: state.auth.password,
  confirmedPassword: state.auth.confirmedPassword,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  register: () => {
    dispatch(register());
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;
