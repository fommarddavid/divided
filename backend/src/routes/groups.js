import { Router } from 'express';

import middlewares from  '../middlewares';
import controllers from '../controllers';

const router = Router();

router.get('/', middlewares.auth.verifyToken, controllers.groups.getGroups);
router.post('/', middlewares.auth.verifyToken, controllers.groups.setGroups);
router.get('/:groupId/members', middlewares.auth.verifyToken, controllers.groups.getMembers);
router.post('/:groupId/members', middlewares.auth.verifyToken, controllers.groups.setMembers);

export default router;