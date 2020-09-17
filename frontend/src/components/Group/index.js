import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GroupStyle from './GroupStyle';

const Group = ({ id, name }) => (
  <GroupStyle>
    <Link to={`group/${id}`}>
      <h1 className="group-card-title">{name}</h1>
    </Link>
  </GroupStyle>
);

Group.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Group;
