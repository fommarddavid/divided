/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../Field';
import Select from '../Select';
import DisplayErrors from '../DisplayErrors';
import ExpenseAddStyle from '../FormStyle';

const ExpenseAdd = ({
  changeValue,
  changePayer,
  addNewExpense,
  newExpenseName,
  newExpenseValue,
  members,
  errorGroupsMessages,
  getErrorGroupsMessage,
}) => {
  /* const handleChange = (evt) => {
    changePayer(evt.target.value);
  }; */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewExpense();
  };
  return (
    <ExpenseAddStyle onSubmit={handleSubmit}>
      <Field
        value={newExpenseName}
        changeValue={changeValue}
        placeholder="Nom de la nouvelle dépense"
        name="newExpenseName"
        type="text"
        getErrorMessage={getErrorGroupsMessage}
      />
      <Field
        value={newExpenseValue}
        changeValue={changeValue}
        placeholder="Valeur de la nouvelle dépense"
        name="newExpenseValue"
        type="number"
        getErrorMessage={getErrorGroupsMessage}
      />
      <Select
        placeholder="Choisissez un membre"
        changePayer={changePayer}
        members={members}
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
    </ExpenseAddStyle>
  );
};

ExpenseAdd.propTypes = {
  changeValue: PropTypes.func.isRequired,
  changePayer: PropTypes.func.isRequired,
  addNewExpense: PropTypes.func.isRequired,
  newExpenseName: PropTypes.string.isRequired,
  newExpenseValue: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  errorGroupsMessages: PropTypes.array.isRequired,
  getErrorGroupsMessage: PropTypes.func.isRequired,
};

export default ExpenseAdd;
