import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import RegisterStyle from '../FormStyle';

const Register = ({
  username,
  email,
  password,
  confirmedPassword,
  changeValue,
  register,
  errorConnection,
  errorMessages,
  getErrorMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    register();
  };
  return (
    <RegisterStyle onSubmit={handleSubmit}>
      <Field
        value={username}
        changeValue={changeValue}
        placeholder="Votre pseudo"
        name="username"
        type="text"
        getErrorMessage={getErrorMessage}
      />
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
      <Field
        value={confirmedPassword}
        changeValue={changeValue}
        placeholder="Confimez votre mot de passe"
        name="confirmedPassword"
        type="password"
        getErrorMessage={getErrorMessage}
      />
      <button
        className="form-button"
        type="submit"
      >S'enregistrer
      </button>
      {errorMessages.map((errorMessage) => (
        <DisplayErrors
          key={errorMessage.value}
          {...errorMessage}
          errorConnection={errorConnection}
          getErrorMessage={getErrorMessage}
        />
      ))}
      {(!errorConnection) && (
        <div className="form-links">
          <Link to="/">Se connecter</Link>
        </div>
      )}
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
  errorConnection: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
};

export default Register;
