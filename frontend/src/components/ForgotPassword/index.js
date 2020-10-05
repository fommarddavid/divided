import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import ForgotPasswordStyle from '../FormStyle';

const ForgotPassword = ({
  email,
  changeValue,
  forgotPassword,
  errorConnection,
  errorMessages,
  getErrorMessage,
  mailHasBeenSentOrReset,
  mailConfirmationMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    forgotPassword();
    // console.log('send email');
  };
  return (
    <ForgotPasswordStyle onSubmit={handleSubmit}>
      <Field
        value={email}
        changeValue={changeValue}
        placeholder="Votre email"
        name="email"
        type="email"
        getErrorMessage={getErrorMessage}
      />
      <button
        className="form-button"
        type="submit"
      >
        Réinitilisez votre mot de passe
      </button>
      {errorMessages.map((errorMessage) => (
        <DisplayErrors
          key={errorMessage.value}
          {...errorMessage}
          getErrorMessage={getErrorMessage}
        />
      ))}
      {(!errorConnection && !mailHasBeenSentOrReset) && (
        <div className="form-links">
          <Link to="/">Se connecter</Link>
          <Link to="/register">S'enregistrer</Link>
        </div>
      )}
      {mailHasBeenSentOrReset && (
        <div className="confirmation-message">
          {mailConfirmationMessage}
        </div>
      )}
    </ForgotPasswordStyle>
  );
};

ForgotPassword.propTypes = {
  email: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  errorConnection: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  mailHasBeenSentOrReset: PropTypes.bool.isRequired,
  mailConfirmationMessage: PropTypes.string.isRequired,
};

export default ForgotPassword;
