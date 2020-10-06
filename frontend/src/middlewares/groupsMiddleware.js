import axios from 'axios';

import {
  getUserDatas,
} from '../actions/auth';

import {
  LOAD_GROUPS,
  getGroups,
  LOAD_GROUP_DETAILS,
  loadGroupDetails,
  getGroupDetails,
  ADD_NEW_GROUP,
  setGroupIsAdded,
  DELETE_GROUP,
  setGroupIsDeleted,
  ADD_NEW_MEMBER,
  setNewMemberIsAdded,
  ADD_NEW_EXPENSE,
  setNewExpenseIsAdded,
  getErrorGroupsMessage,
  resetGroupsField,
} from '../actions/groups';

const groupsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOAD_GROUPS: {
      const token = sessionStorage.getItem('token');
      axios
        .get(`${process.env.URL_API}groups`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log('LOAD_GROUPS : ', response.data);
          store.dispatch(getUserDatas(response.data.email, response.data.username));
          store.dispatch(getGroups(response.data.groups));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case LOAD_GROUP_DETAILS: {
      const state = store.getState();
      const token = sessionStorage.getItem('token');
      axios
        .get(`${process.env.URL_API}groups/${state.groups.selectedId}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log('LOAD_GROUP_DETAILS ', response.data);
          store.dispatch(getGroupDetails(
            response.data.groupName,
            response.data.members,
            response.data.expenses,
            response.data.totalExpense,
            response.data.perPaxExpense,
            response.data.balances,
            response.data.debts,
          ));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case ADD_NEW_GROUP: {
      const state = store.getState();
      const token = sessionStorage.getItem('token');
      // console.log(token);
      axios({
        method: 'post',
        url: `${process.env.URL_API}groups`,
        data: {
          name: state.groups.groupName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // console.log('ADD_NEW_GROUP', response.data);
        if (response.data.success) {
          store.dispatch(setGroupIsAdded(false));
        }
      }).catch((error) => {
        // console.log(error);
        store.dispatch(getErrorGroupsMessage(
          error.response.data.error,
          error.response.data.messages,
        ));
      });
      break;
    }
    case DELETE_GROUP: {
      const state = store.getState();
      const token = sessionStorage.getItem('token');
      const groupId = state.groups.selectedId;
      axios({
        method: 'delete',
        url: `${process.env.URL_API}groups/${groupId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        console.log('DELETE_GROUP', response.data);
        store.dispatch(setGroupIsDeleted(false));
      }).catch((error) => {
        console.log(error);
      });
      break;
    }
    case ADD_NEW_MEMBER: {
      const state = store.getState();
      const token = sessionStorage.getItem('token');
      const groupId = state.groups.selectedId;
      axios({
        method: 'post',
        url: `${process.env.URL_API}groups/${groupId}/members`,
        data: {
          name: state.groups.newMemberName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // console.log('ADD_NEW_MEMBER', response.data);
        if (response.data.succes) {
          store.dispatch(setNewMemberIsAdded(false));
          store.dispatch(loadGroupDetails());
          store.dispatch(resetGroupsField());
        }
      }).catch((error) => {
        // console.log(error);
        store.dispatch(getErrorGroupsMessage(
          error.response.data.error,
          error.response.data.messages,
        ));
      });
      break;
    }
    case ADD_NEW_EXPENSE: {
      const state = store.getState();
      const token = sessionStorage.getItem('token');
      const groupId = state.groups.selectedId;
      axios({
        method: 'post',
        url: `${process.env.URL_API}groups/${groupId}/expenses`,
        data: {
          newExpenseName: state.groups.newExpenseName,
          newExpenseValue: state.groups.newExpenseValue,
          memberId: state.groups.newExpensePayer,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // console.log('ADD_NEW_EXPENSE', response.data);
        if (response.data.success) {
          store.dispatch(setNewExpenseIsAdded(false));
          store.dispatch(loadGroupDetails());
          store.dispatch(resetGroupsField());
        }
      }).catch((error) => {
        // console.log(error);
        store.dispatch(getErrorGroupsMessage(
          error.response.data.error,
          error.response.data.messages,
        ));
      });
      break;
    }
    default:
      break;
  }
  // On passe au suivant
  next(action);
};

export default groupsMiddleware;
