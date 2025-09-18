import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { validateData } from '../../middleware/validationMiddleware';
import { userUpdateSchema, changePasswordSchema } from '../../db/validator/user.validation';

const router = Router();

router.get('/me', authenticate, userController.me);

export default router;
