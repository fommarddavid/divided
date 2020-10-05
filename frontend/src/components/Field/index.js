import React from 'react';
import PropTypes from 'prop-types';

import FieldStyled from './FieldStyled';

const Field = ({
  value,
  changeValue,
  placeholder,
  name,
  type,
  getErrorMessage,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleFocus = () => {
    getErrorMessage(false, []);
  };
  return (
    <FieldStyled>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete="off"
        // required
      />
      <label
        className="label"
        htmlFor={name}
      >
        {placeholder}
      </label>
    </FieldStyled>
  );
};

Field.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
};

export default Field;
