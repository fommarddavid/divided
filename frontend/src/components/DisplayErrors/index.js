import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DisplayErrorsStyled from './DisplayErrorsStyled';

const DisplayErrors = ({ getErrorMessage, msg }) => {
  const handleClick = () => {
    getErrorMessage(false, []);
  };
  return (
    <DisplayErrorsStyled>
      <div className="form-error">
        <h1 className="form-error-title">{(msg === 'jwt expired' || msg === 'invalid signature') ? '' : msg }</h1>
        {(msg === 'Email non reconnu') && (
          <div className="form-error-message">
            Merci de vérifier votre email ou de vous enregistrer <Link to="/register" className="form-error-message--link" onClick={handleClick}>ici</Link>
          </div>
        )}
        {(msg === 'Mauvais mot de passe') && (
          <div className="form-error-message">
            Vous l'avez oublié? Renouvelez le <Link to="/password" className="form-error-message--link" onClick={handleClick}>ici</Link>
          </div>
        )}
        {(msg === 'Mot de passe non valide' || msg === 'Les deux mots de passe sont différents') && (
          <div className="form-error-message">
            Merci de recommencer...
          </div>
        )}
        {(msg === 'Email déjà utilisé') && (
          <div className="form-error-message">
            Vous êtes déjà membre? Connectez-vous <Link to="/" className="form-error-message--link" onClick={handleClick}>ici</Link>
          </div>
        )}
        {(msg === 'invalid signature') && (
          <div className="form-error-message">
            Le lien de réinitialisation a déjà été utilisé
          </div>
        )}
        {(msg === 'jwt expired') && (
          <div className="form-error-message">
            Le lien de réinitialisation a expiré
          </div>
        )}
      </div>
    </DisplayErrorsStyled>
  );
};

DisplayErrors.propTypes = {
  msg: PropTypes.string.isRequired,
  getErrorMessage: PropTypes.func.isRequired,
};

export default DisplayErrors;
