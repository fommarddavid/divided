import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import MemberAddStyle from '../FormStyle';

const MemberAdd = ({
  changeValue,
  newMemberName,
  addNewMember,
  errorGroupsMessages,
  getErrorGroupsMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewMember();
  };

  return (
    <MemberAddStyle onSubmit={handleSubmit}>
      <Field
        value={newMemberName}
        changeValue={changeValue}
        placeholder="Nom du nouveau membre"
        name="newMemberName"
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
    </MemberAddStyle>
  );
};

MemberAdd.propTypes = {
  changeValue: PropTypes.func.isRequired,
  newMemberName: PropTypes.string.isRequired,
  addNewMember: PropTypes.func.isRequired,
  errorGroupsMessages: PropTypes.array.isRequired,
  getErrorGroupsMessage: PropTypes.func.isRequired,
};

export default MemberAdd;
