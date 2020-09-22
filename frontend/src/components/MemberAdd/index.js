import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MemberAddStyle from '../FormStyle';

const MemberAdd = ({
  changeValue,
  newMemberName,
  addNewMember,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewMember();
  };
  return (
    <MemberAddStyle onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Nom du nouveau membre"
        name="newMemberName"
        value={newMemberName}
        onChange={handleChange}
        autoComplete="off"
      />
      <button className="form-button" type="submit">Ajouter</button>
      <div className="form-links">
        <Link to="/dashboard">back to your dashboard</Link>
      </div>
    </MemberAddStyle>
  );
};

MemberAdd.propTypes = {
  changeValue: PropTypes.func.isRequired,
  newMemberName: PropTypes.string.isRequired,
  addNewMember: PropTypes.func.isRequired,
};

export default MemberAdd;
