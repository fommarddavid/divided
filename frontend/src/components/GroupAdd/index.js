import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import GroupAddStyle from '../FormStyle';

const GroupAdd = ({
  groupName,
  changeValue,
  addNewGroup,
  errorGroupsMessages,
  getErrorGroupsMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewGroup();
  };

  return (
    <GroupAddStyle onSubmit={handleSubmit}>
      <Field
        value={groupName}
        changeValue={changeValue}
        placeholder="Nom du nouveau groupe"
        name="groupName"
        type="text"
        getErrorMessage={getErrorGroupsMessage}
      />
      <button className="form-button" type="submit">Ajouter</button>
      {errorGroupsMessages.map((errorMessage) => (
        <DisplayErrors
          key={errorMessage.value}
          {...errorMessage}
          getErrorMessage={getErrorGroupsMessage}
        />
      ))}
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
  errorGroupsMessages: PropTypes.array.isRequired,
  getErrorGroupsMessage: PropTypes.func.isRequired,
};

export default GroupAdd;
