import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GroupAddStyle from '../FormStyle';

const GroupAdd = ({
  groupName,
  changeValue,
  addNewGroup,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewGroup();
  };
  return (
    <GroupAddStyle onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Nom du nouveau groupe"
        name="groupName"
        value={groupName}
        onChange={handleChange}
        autoComplete="off"
      />
      <button className="form-button" type="submit">Ajouter</button>
      <div className="form-links">
        <Link to="/dashboard">back to your dashboard</Link>
      </div>
    </GroupAddStyle>
  );
};

GroupAdd.propTypes = {
  groupName: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  addNewGroup: PropTypes.func.isRequired,
};

export default GroupAdd;
