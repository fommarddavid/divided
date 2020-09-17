import { combineReducers } from 'redux';

// import demoReducer from './demo';
import authReducer from './auth';
import groupsReducer from './groups';

const rootReducer = combineReducers({
  // demo: demoReducer,
  auth: authReducer,
  groups: groupsReducer,
  // ... autres reducers
});

export default rootReducer;
