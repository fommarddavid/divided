import { Router } from 'express';
import { body } from 'express-validator';
import { limit } from 'express-limit';

import { User } from '../models';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = Router();

router.post('/register', [
  body('username', 'Identifiant non valide')
    .not().isEmpty().trim().escape(),
  body('email', 'Email non valide')
    .not().isEmpty().isEmail().normalizeEmail()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if(user) {
          return Promise.reject('Email déjà utilisé');
        }
      });
    }),
  body('password', 'Le mot de passe doit avoir au moins 8 caractères')
  .not().isEmpty().isLength({min: 8}),
  body('confirmedPassword', 'Les deux mots de passe sont différents')
    .custom((value, {req}) => (value === req.body.password)),
], controllers.auth.register);

router.post('/login', [
  body('email', 'Email non valide')
  .not().isEmpty().isEmail().normalizeEmail()
  .custom((value) => {
    return User.findOne({ where: { email: value } }).then((user) => {
      if(!user) {
        return Promise.reject('Email non reconnu');
      }
    });
  }),
], limit({
  max: 5,
  period: 60 * 1000,
  message: 'Too many requests'
}) , controllers.auth.login);

export default router;