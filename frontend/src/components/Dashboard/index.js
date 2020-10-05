// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PlusCircle, LogOut } from 'react-feather';

// == Import
import Group from '../Group';
import DashboardStyle from './DashboardStyle';
import theme from '../../styles/theme';

// == Composant

const Dashboard = ({
  username,
  loadGroups,
  groups,
  setIsConnected,
  groupIsAdded,
  setGroupIsAdded,
  groupIsDeleted,
  setGroupIsDeleted,
  getErrorGroupsMessage,
  resetGroupsField,
  setMailhasBeenSentOrReset,
  resetAuthField,
}) => {
  useEffect(() => {
    loadGroups();
    if (groupIsAdded) {
      setGroupIsAdded(true);
    }
    if (groupIsDeleted) {
      setGroupIsDeleted(true);
    }
    getErrorGroupsMessage(false, []);
    resetGroupsField('', '', '', '', '');
    setMailhasBeenSentOrReset(false, '');
  }, []);
  const handleClick = () => {
    setIsConnected(true);
    resetAuthField();
    sessionStorage.clear();
  };

  return (
    <DashboardStyle>
      <div className="plus">
        <Link to="/group/add">
          <PlusCircle color={theme.color.border} size={40} />
        </Link>
        <h1>{username}</h1>
        <LogOut color={theme.color.border} size={40} onClick={handleClick} />
      </div>
      {groups.map((group) => (
        <Group
          key={group.id}
          {...group}
        />
      ))}
    </DashboardStyle>
  );
};

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  loadGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  setIsConnected: PropTypes.func.isRequired,
  groupIsAdded: PropTypes.bool.isRequired,
  setGroupIsAdded: PropTypes.func.isRequired,
  groupIsDeleted: PropTypes.bool.isRequired,
  setGroupIsDeleted: PropTypes.func.isRequired,
  getErrorGroupsMessage: PropTypes.func.isRequired,
  resetGroupsField: PropTypes.func.isRequired,
  setMailhasBeenSentOrReset: PropTypes.func.isRequired,
  resetAuthField: PropTypes.func.isRequired,
};

// == Export
export default Dashboard;
