import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import GroupDetails from '../components/GroupDetails';

// Action Creators
import {
  saveSelectedId,
  loadGroupDetails,
  setGroupIsDeleted,
  setNewMemberIsAdded,
  getGroupDetails,
} from '../actions/groups';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state, ownProps) => ({
  selectedGroupId: Number(ownProps.match.params.id),
  groupName: state.groups.groupName,
  members: state.groups.members,
  groupIsDeleted: state.groups.groupIsDeleted,
  newMemberIsAdded: state.groups.newMemberIsAdded,
  expenses: state.groups.expenses,
  totalExpense: state.groups.totalExpense,
  perPaxExpense: state.groups.perPaxExpense,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  saveSelectedId: (id) => {
    dispatch(saveSelectedId(id));
  },
  loadGroupDetails: () => {
    dispatch(loadGroupDetails());
  },
  setGroupIsDeleted: (bool) => {
    dispatch(setGroupIsDeleted(bool));
  },
  setNewMemberIsAdded: (bool) => {
    dispatch(setNewMemberIsAdded(bool));
  },
  getGroupDetails: (groupName, members, expenses, totalExpense, perPaxExpense) => {
    dispatch(getGroupDetails(groupName, members, expenses, totalExpense, perPaxExpense));
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const GroupDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(GroupDetails);

export default GroupDetailsContainer;
