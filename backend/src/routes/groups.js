import { Router } from 'express';
import { body } from 'express-validator';
import jwt, { decode } from 'jsonwebtoken';

import { Group, Member } from '../models';
import middlewares from  '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auth.verifyToken, controllers.groups.getGroups);

router.post('/',[
  body('name', 'Le nom du groupe ne peut être vide')
    .not().isEmpty().trim().escape()
    .custom((value, {req}) => {
      const token = middlewares.auth.getTokenFromHeader(req);
      const decoded = jwt.decode(token);
      return Group.findAll({ where: { userId: decoded.id }, attributes: ['name'] }).then((groups) => {
        const group = groups.find((g) => (g.name === value));
        if(group) {
          return Promise.reject(`Vous avez déjà créé le groupe ${value}`)
        }
      })
    }),
], middlewares.auth.verifyToken, controllers.groups.setGroups);

router.delete('/:groupId', middlewares.auth.verifyToken, controllers.groups.deleteGroup);

router.get('/:groupId/details', middlewares.auth.verifyToken, controllers.groups.getDetails);

router.post('/:groupId/members',[
  body('name', 'Le nom du membre ne peut être vide')
    .not().isEmpty().trim().escape()
    .custom((value, {req}) => {
      return Member.findAll({ where: { groupId: req.params.groupId }, attributes: ['name'] }).then((members) => {
        const member = members.find((m) => (m.name === value));
        if(member) {
          return Promise.reject(`${value} est déjà membre de ce groupe`)
        }
      });
    })
], middlewares.auth.verifyToken, controllers.groups.setMembers);

router.post('/:groupId/expenses',[
  body('newExpenseName', 'Le nom de la dépense ne peut être vide')
    .not().isEmpty().trim().escape(),
  body('newExpenseValue','La valeur de la dépense ne peut être vide')
    .not().isEmpty().trim().escape().toFloat().isDecimal().withMessage(' '),
  body('memberId')
    .toInt()
    .custom((value, {req}) => {
      return Member.findAll({ where: {groupId: req.params.groupId}, attributes: ['id'] }).then((members) => {
        const member = members.find((m) => (m.id === value));
        if(!member) {
          return Promise.reject('id non valide');
        }
      });
    }),
], middlewares.auth.verifyToken, controllers.groups.setExpenses);

// router.get('/:groupId/expenses', middlewares.auth.verifyToken, controllers.groups.getExpenses);

export default router;