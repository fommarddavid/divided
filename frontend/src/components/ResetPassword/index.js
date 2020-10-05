import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Field from '../Field';
import DisplayErrors from '../DisplayErrors';
import ResetPasswordStyle from '../FormStyle';

const ResetPassword = ({
  password,
  confirmedPassword,
  changeValue,
  resetPassword,
  username,
  token,
  setResetPasswordToken,
  errorConnection,
  errorMessages,
  getErrorMessage,
  mailHasBeenSentOrReset,
  mailConfirmationMessage,
  setMailhasBeenSentOrReset,
  resetAuthField,
}) => {
  useEffect(() => {
    setResetPasswordToken(username, token);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetPassword();
  };

  const handleClick = () => {
    setResetPasswordToken('', '');
    setMailhasBeenSentOrReset(false, '');
    resetAuthField();
  };
  return (
    <ResetPasswordStyle onSubmit={handleSubmit}>
      <Field
        value={password}
        changeValue={changeValue}
        placeholder="Nouveau mdp"
        name="password"
        type="password"
        getErrorMessage={getErrorMessage}
      />
      <Field
        value={confirmedPassword}
        changeValue={changeValue}
        placeholder="Confirmation du nouveau mdp"
        name="confirmedPassword"
        type="password"
        getErrorMessage={getErrorMessage}
      />
      <button
        className="form-button"
        type="submit"
      >
        Créer un nouveau mot de passe
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
          {mailConfirmationMessage}. Connectez-vous <Link to="/" onClick={handleClick}>ici</Link>
        </div>
      )}
    </ResetPasswordStyle>
  );
};

ResetPassword.propTypes = {
  password: PropTypes.string.isRequired,
  confirmedPassword: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setResetPasswordToken: PropTypes.func.isRequired,
  errorConnection: PropTypes.bool.isRequired,
  errorMessages: PropTypes.array.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
  mailHasBeenSentOrReset: PropTypes.bool.isRequired,
  mailConfirmationMessage: PropTypes.string.isRequired,
  setMailhasBeenSentOrReset: PropTypes.func.isRequired,
  resetAuthField: PropTypes.func.isRequired,
};

export default ResetPassword;
