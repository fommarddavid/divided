import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LoginStyle from '../FormStyle';

const Login = ({
  email,
  password,
  changeValue,
  login,
}) => {
  const handleChange = (evt) => {
    changeValue(evt.target.name, evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    login();
  };
  return (
    <LoginStyle onSubmit={handleSubmit}>
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
      <button className="form-button" type="submit">Se Connecter</button>
      <div className="form-links">
        <Link to="/register">S'enregistrer</Link>
        <Link to="/password">Mot de passe oublié</Link>
      </div>
    </LoginStyle>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Login;
