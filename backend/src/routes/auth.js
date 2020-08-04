import { Router } from 'express';

import controllers from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello Nok!');
});

router.post('/register', controllers.auth.register);

export default router;