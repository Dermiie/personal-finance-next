import { Router } from 'express';
import { login, signUp } from './auth.controller';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
