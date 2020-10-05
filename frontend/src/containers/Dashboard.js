import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import Dashboard from 'src/components/Dashboard';

// Action Creators
import {
  setIsConnected,
  setMailhasBeenSentOrReset,
  resetAuthField,
} from '../actions/auth';
import {
  loadGroups,
  setGroupIsAdded,
  setGroupIsDeleted,
  getErrorGroupsMessage,
  resetGroupsField,
} from '../actions/groups';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  username: state.auth.username,
  groups: state.groups.groups,
  groupIsAdded: state.groups.groupIsAdded,
  groupIsDeleted: state.groups.groupIsDeleted,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  loadGroups: () => {
    dispatch(loadGroups());
  },
  setIsConnected: (bool) => {
    dispatch(setIsConnected(bool));
  },
  setGroupIsAdded: (bool) => {
    dispatch(setGroupIsAdded(bool));
  },
  setGroupIsDeleted: (bool) => {
    dispatch(setGroupIsDeleted(bool));
  },
  getErrorGroupsMessage: (bool, messages) => {
    dispatch(getErrorGroupsMessage(bool, messages));
  },
  resetGroupsField: () => {
    dispatch(resetGroupsField());
  },
  setMailhasBeenSentOrReset: (bool, messages) => {
    dispatch(setMailhasBeenSentOrReset(bool, messages));
  },
  resetAuthField: () => {
    dispatch(resetAuthField());
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
