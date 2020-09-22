// == Import npm
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ModalProvider } from 'styled-react-modal';

// == Import
import Login from '../../containers/Login';
import Dashboard from '../../containers/Dashboard';
import Register from '../../containers/Register';
import Header from '../Header';
import Password from '../Password';
import GroupDetails from '../../containers/GroupDetails';
import GroupAdd from '../../containers/GroupAdd';
import MemberAdd from '../../containers/MemberAdd';
import ExpenseAdd from '../../containers/ExpenseAdd';
import AppStyle from './AppStyle';

// == Composant
const App = ({
  isConnected,
  setIsConnected,
  groupIsAdded,
  newMemberIsAdded,
}) => {
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      setIsConnected(false);
    }
  }, []);

  return (
    <AppStyle>
      <ModalProvider>
        <Header />
        <Route exact path="/">
          {isConnected ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/dashboard">
          {!isConnected ? <Redirect to="/" /> : <Dashboard />}
        </Route>
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/password"
          component={Password}
        />
        <Route
          exact
          path="/group/:id"
          component={GroupDetails}
        />
        <Route exact path="/group/add">
          <GroupAdd />
        </Route>
        <Route exact path="/:id/members/add">
          {newMemberIsAdded ? <Redirect to="/dashboard" /> : <MemberAdd />}
        </Route>
        <Route
          exact
          path="/:id/expense/add"
          component={ExpenseAdd}
        />
      </ModalProvider>
    </AppStyle>
  );
};

App.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  setIsConnected: PropTypes.func.isRequired,
  groupIsAdded: PropTypes.bool.isRequired,
  newMemberIsAdded: PropTypes.bool.isRequired,
};

// == Export
export default App;
