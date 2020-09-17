import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducer
import rootReducer from '../reducers';

// middlewares
// import logMiddleware from '../middlewares/logMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import groupsMiddleware from '../middlewares/groupsMiddleware';

const enhancers = composeWithDevTools(
  applyMiddleware(
    // logMiddleware,
    authMiddleware,
    groupsMiddleware,
    // ... autres middlewares
  ),
);

const store = createStore(
  rootReducer,
  enhancers,
);

export default store;
