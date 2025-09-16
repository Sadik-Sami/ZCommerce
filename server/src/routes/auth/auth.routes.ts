import { Router } from 'express';
import { authController } from './auth.controller';
import { validateData } from '../../middleware/validationMiddleware';
import { userInsertSchema } from '../../db/validator/user.validation';

const router = Router();

router.post('/signup', validateData(userInsertSchema), authController.signup);

export default router;
