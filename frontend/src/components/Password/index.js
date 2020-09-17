import React from 'react';
import { Link } from 'react-router-dom';

import PasswordStyle from '../FormStyle';

const ForgottenPwd = () => (
  <PasswordStyle>
    <input className="form-input" type="email" placeholder="Email" />
    <button className="form-button" type="submit">Créer un nouveau mot de passe</button>
    <div className="form-links">
      <Link to="/login">Se connecter</Link>
      <Link to="/register">S'enregistrer</Link>
    </div>
  </PasswordStyle>
);

export default ForgottenPwd;
