/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import LoginStyle from '../FormStyle';

const Login = ({
  email,
  password,
  changeValue,
  login,
  errorConnection,
  errorMessages,
  getErrorMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    login();
  };

  return (
    <LoginStyle onSubmit={handleSubmit}>
      <Field
        value={email}
        changeValue={changeValue}
        placeholder="Votre email"
        name="email"
        type="email"
        getErrorMessage={getErrorMessage}
      />
      <Field
        value={password}
        changeValue={changeValue}
        placeholder="Votre mot de passe"
        name="password"
        type="password"
        getErrorMessage={getErrorMessage}
      />
      <button className="form-button" type="submit">Se Connecter</button>
      {errorMessages.map((errorMessage) => (
        <DisplayErrors
          key={errorMessage.value}
          {...errorMessage}
          getErrorMessage={getErrorMessage}
        />
      ))}
      {!errorConnection && (
        <div className="form-links">
          <Link to="/register">S'enregistrer</Link>
          <Link to="/password/forgot">Mot de passe oublié</Link>
        </div>
      )}
    </LoginStyle>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  errorConnection: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
};

export default Login;
