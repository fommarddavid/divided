import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import App from '../components/App';

// Action Creators
import { setIsConnected } from '../actions/auth';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  isConnected: state.auth.isConnected,
  groupIsAdded: state.groups.groupIsAdded,
  newMemberIsAdded: state.groups.newMemberIsAdded,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  setIsConnected: (bool) => {
    dispatch(setIsConnected(bool));
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
