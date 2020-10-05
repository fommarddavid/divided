// Action Types
import {
  CHANGE_VALUE,
  CHANGE_PAYER,
  GET_GROUPS,
  SAVE_SELECTED_ID,
  GET_GROUP_DETAILS,
  SET_GROUP_IS_ADDED,
  SET_GROUP_IS_DELETED,
  SET_NEW_MEMBER_IS_ADDED,
  SET_NEW_EXPENSE_IS_ADDED,
  GET_ERROR_GROUPS_MESSAGE,
  RESET_GROUPS_FIELD,
} from '../actions/groups';

// Initial State
const initialState = {
  selectedId: '',
  groups: [],
  groupName: '',
  newMemberName: '',
  newExpenseName: '',
  newExpenseValue: '',
  newExpensePayer: '',
  members: [],
  expenses: [],
  totalExpense: 0,
  perPaxExpense: 0,
  balances: [],
  debts: [],
  groupIsAdded: false,
  groupIsDeleted: false,
  newMemberIsAdded: false,
  newExpenseIsAdded: false,
  errorGroups: false,
  errorGroupsMessages: [],
};

// Reducer
const groupsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case CHANGE_PAYER:
      return {
        ...state,
        newExpensePayer: action.memberId,
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    case SAVE_SELECTED_ID:
      return {
        ...state,
        selectedId: action.id,
      };
    case GET_GROUP_DETAILS:
      return {
        ...state,
        groupName: action.groupName,
        members: action.members,
        expenses: action.expenses,
        totalExpense: action.totalExpense,
        perPaxExpense: action.perPaxExpense,
        balances: action.balances,
        debts: action.debts,
      };
    case SET_GROUP_IS_ADDED:
      return {
        ...state,
        groupIsAdded: !action.bool,
      };
    case SET_GROUP_IS_DELETED:
      return {
        ...state,
        groupIsDeleted: !action.bool,
      };
    case SET_NEW_MEMBER_IS_ADDED:
      return {
        ...state,
        newMemberIsAdded: !action.bool,
      };
    case SET_NEW_EXPENSE_IS_ADDED:
      return {
        ...state,
        newExpenseIsAdded: !action.bool,
      };
    case GET_ERROR_GROUPS_MESSAGE:
      return {
        ...state,
        errorGroups: action.bool,
        errorGroupsMessages: action.messages,
      };
    case RESET_GROUPS_FIELD:
      return {
        ...state,
        groupName: '',
        newMemberName: '',
        newExpenseName: '',
        newExpenseValue: '',
        newExpensePayer: '',
      };
    default:
      return state;
  }
};

export default groupsReducer;
