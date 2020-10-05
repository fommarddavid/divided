// Types
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const CHANGE_PAYER = 'CHANGE_PAYER';
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const GET_GROUPS = 'GET_GROUPS';
export const LOAD_GROUP_DETAILS = 'LOAD_GROUP_DETAILS';
export const SAVE_SELECTED_ID = 'SAVE_SELECTED_ID';
export const GET_GROUP_DETAILS = 'GET_GROUP_DETAILS';
export const ADD_NEW_GROUP = 'ADD_NEW_GROUP';
export const SET_GROUP_IS_ADDED = 'SET_GROUP_IS_ADDED';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SET_GROUP_IS_DELETED = 'SET_GROUP_IS_DELETED';
export const ADD_NEW_MEMBER = 'ADD_NEW_MEMBER';
export const SET_NEW_MEMBER_IS_ADDED = 'SET_NEW_MEMBER_IS_ADDED';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export const SET_NEW_EXPENSE_IS_ADDED = 'SET_NEW_EXPENSE_IS_ADDED';
export const GET_ERROR_GROUPS_MESSAGE = 'GET_ERROR_GROUPS_MESSAGE';
export const RESET_GROUPS_FIELD = 'RESET_GROUPS_FIELD';

// Creators
export const changeValue = (name, value) => ({
  type: CHANGE_VALUE,
  name,
  value,
});

export const changePayer = (memberId) => ({
  type: CHANGE_PAYER,
  memberId,
});

export const loadGroups = () => ({
  type: LOAD_GROUPS,
});

export const getGroups = (groups) => ({
  type: GET_GROUPS,
  groups,
});

export const saveSelectedId = (id) => ({
  type: SAVE_SELECTED_ID,
  id,
});

export const loadGroupDetails = () => ({
  type: LOAD_GROUP_DETAILS,
});

export const getGroupDetails = (
  groupName,
  members,
  expenses,
  totalExpense,
  perPaxExpense,
  balances,
  debts,
) => ({
  type: GET_GROUP_DETAILS,
  groupName,
  members,
  expenses,
  totalExpense,
  perPaxExpense,
  balances,
  debts,
});

export const addNewGroup = () => ({
  type: ADD_NEW_GROUP,
});

export const setGroupIsAdded = (bool) => ({
  type: SET_GROUP_IS_ADDED,
  bool,
});

export const deleteGroup = () => ({
  type: DELETE_GROUP,
});

export const setGroupIsDeleted = (bool) => ({
  type: SET_GROUP_IS_DELETED,
  bool,
});

export const addNewMember = () => ({
  type: ADD_NEW_MEMBER,
});

export const setNewMemberIsAdded = (bool) => ({
  type: SET_NEW_MEMBER_IS_ADDED,
  bool,
});

export const addNewExpense = () => ({
  type: ADD_NEW_EXPENSE,
});

export const setNewExpenseIsAdded = (bool) => ({
  type: SET_NEW_EXPENSE_IS_ADDED,
  bool,
});

export const getErrorGroupsMessage = (bool, messages) => ({
  type: GET_ERROR_GROUPS_MESSAGE,
  bool,
  messages,
});

export const resetGroupsField = () => ({
  type: RESET_GROUPS_FIELD,
});
