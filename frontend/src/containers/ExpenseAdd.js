import { connect } from 'react-redux';

// Du composant qui a besoin de data ou d'actions
// eslint-disable-next-line import/no-unresolved
import ExpenseAdd from '../components/ExpenseAdd';

// Action Creators
import {
  changeValue,
  changePayer,
  addNewExpense,
  getErrorGroupsMessage,
} from '../actions/groups';

// == Data / state
// Notre composant à besoin de données depuis le state ?
// On prépare un objet avec les props attendues par le composant
const mapStateToProps = (state) => ({
  members: state.groups.members,
  newExpenseName: state.groups.newExpenseName,
  newExpenseValue: state.groups.newExpenseValue,
  errorGroupsMessages: state.groups.errorGroupsMessages,
});

// == Actions / dispatch
// Notre composant à besoin d'agir sur le state ?
// On prépare un objet avec les props attendues par le composant
const mapDispatchToProps = (dispatch) => ({
  changeValue: (name, value) => {
    dispatch(changeValue(name, value));
  },
  changePayer: (memberId) => {
    dispatch(changePayer(memberId));
  },
  addNewExpense: () => {
    dispatch(addNewExpense());
  },
  getErrorGroupsMessage: (bool, messages) => {
    dispatch(getErrorGroupsMessage(bool, messages));
  },
});

// création du lien : container
// connect(redux)(react) - connect(ce dont on a besoin)(qui en a besoin)
const ExpenseAddContainer = connect(mapStateToProps, mapDispatchToProps)(ExpenseAdd);

export default ExpenseAddContainer;
