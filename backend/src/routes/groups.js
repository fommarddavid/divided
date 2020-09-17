import { Router } from 'express';

import middlewares from  '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auth.verifyToken, controllers.groups.getGroups);
router.post('/', middlewares.auth.verifyToken, controllers.groups.setGroups);
router.delete('/:groupId', middlewares.auth.verifyToken, controllers.groups.deleteGroup);
router.get('/:groupId/details', middlewares.auth.verifyToken, controllers.groups.getDetails);
router.post('/:groupId/members', middlewares.auth.verifyToken, controllers.groups.setMembers);
router.post('/:groupId/expenses', middlewares.auth.verifyToken, controllers.groups.setExpenses);
// router.get('/:groupId/expenses', middlewares.auth.verifyToken, controllers.groups.getExpenses);

export default router;