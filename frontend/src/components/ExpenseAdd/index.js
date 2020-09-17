import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ExpenseAddStyle from '../FormStyle';

const ExpenseAdd = ({
  changeValue,
  changePayer,
  addNewExpense,
  newExpenseName,
  newExpenseValue,
  members,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleChange2 = (evt) => {
    changePayer(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNewExpense();
  };
  return (
    <ExpenseAddStyle onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Nom de la nouvelle dépense"
        name="newExpenseName"
        value={newExpenseName}
        onChange={handleChange}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Valeur de la nouvelle dépense"
        name="newExpenseValue"
        value={newExpenseValue}
        onChange={handleChange}
      />
      <select className="form-input" name="payers" id="payer-select" onChange={handleChange2}>
        <option value="">Qui a fait cette dépense?</option>
        {members.map((member) => (
          <option
            key={member.id}
            value={member.id}
          >
            {member.name}
          </option>
        ))}
      </select>
      <button className="form-button" type="submit">Ajouter</button>
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
};

export default ExpenseAdd;
