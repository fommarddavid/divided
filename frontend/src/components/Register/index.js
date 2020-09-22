import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RegisterStyle from '../FormStyle';

const Register = ({
  username,
  email,
  password,
  confirmedPassword,
  changeValue,
  register,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    register();
  };
  return (
    <RegisterStyle onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="form-input"
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="form-input"
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="form-input"
        type="password"
        placeholder="Confirm password"
        name="confirmedPassword"
        value={confirmedPassword}
        onChange={handleChange}
        autoComplete="off"
      />
      <button className="form-button" type="submit">S'enregistrer</button>
      <div className="form-links">
        <Link to="/">Se connecter</Link>
      </div>
    </RegisterStyle>
  );
};

Register.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmedPassword: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default Register;
