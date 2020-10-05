import { Router } from 'express';
import { body } from 'express-validator';

import { User } from '../models';

import controllers from '../controllers';

const router = Router();

router.post('/forgot', [
  body('email')
    .normalizeEmail()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if(!user) {
          return Promise.reject('Email non reconnu');
        }
      });
    }),
], controllers.password.forgot);

router.post('/reset', [
  body('password', 'Le mot de passe doit avoir au moins 8 caractères')
  .not().isEmpty().isLength({min: 8}),
  body('confirmedPassword', 'Les deux mots de passe sont différents')
    .custom((value, {req}) => (value === req.body.password)),
], controllers.password.reset);

export default router;