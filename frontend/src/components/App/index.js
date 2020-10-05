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
import ForgotPassword from '../../containers/ForgotPassword';
import ResetPassword from '../../containers/ResetPassword';
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
  newExpenseIsAdded,
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
          {(!isConnected) ? <Redirect to="/" /> : <Dashboard />}
        </Route>
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/password/forgot"
          component={ForgotPassword}
        />
        <Route
          exact
          path="/password/reset/:username/:header/:payload/:signature"
          component={ResetPassword}
        />
        <Route
          exact
          path="/group/:id/details"
          component={GroupDetails}
        />
        <Route exact path="/group/add">
          {groupIsAdded ? <Redirect to="/dashboard" /> : <GroupAdd />}
        </Route>
        <Route exact path="/group/:id/member/add">
          {newMemberIsAdded ? <Redirect to={`/group/${sessionStorage.getItem('selectedId')}/details`} /> : <MemberAdd />}
        </Route>
        <Route exact path="/group/:id/expense/add">
          {newExpenseIsAdded ? <Redirect to={`/group/${sessionStorage.getItem('selectedId')}/details`} />
            : <ExpenseAdd />}
        </Route>
      </ModalProvider>
    </AppStyle>
  );
};

App.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  setIsConnected: PropTypes.func.isRequired,
  groupIsAdded: PropTypes.bool.isRequired,
  newMemberIsAdded: PropTypes.bool.isRequired,
  newExpenseIsAdded: PropTypes.bool.isRequired,
};

// == Export
export default App;
