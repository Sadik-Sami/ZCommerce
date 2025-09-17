import { Router } from 'express';
import { authController } from './auth.controller';
import { validateData } from '../../middleware/validationMiddleware';
import { userInsertSchema } from '../../db/validator/user.validation';
import { loginSchema } from '../../db/validator/auth.validation';

const router = Router();

router.post('/signup', validateData(userInsertSchema), authController.signup);
router.post('/login', validateData(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
