import { Router } from 'express';
import { signUp } from './auth.controller';

const router: Router = Router();

router.post('/signup', signUp);

export default router;
