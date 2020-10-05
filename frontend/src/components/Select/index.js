/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import SelectStyled from './SelectStyled';

const Select = ({
  placeholder,
  changePayer,
  members,
}) => {
  const handleChange = (evt) => {
    changePayer(evt.target.value);
  };
  return (
    <SelectStyled>
      <div className="select">
        <select
          name="payers"
          id="payer-select"
          onChange={handleChange}
        >
          <option required value="">{placeholder}</option>
          {members.map((member) => (
            <option
              key={member.id}
              value={member.id}
            >
              {member.name}
            </option>
          ))}
        </select>
        <label
          className="label"
          htmlFor="payer-select"
        >
          {placeholder}
        </label>
      </div>
    </SelectStyled>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
  changePayer: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Select;
