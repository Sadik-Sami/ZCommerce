import { Request, Response, NextFunction } from 'express';
import { userServices } from './user.service';
import { publicUserSelectSchema, userUpdateSchema, changePasswordSchema } from '../../db/validator/user.validation';
import { AppError } from '../../middleware/errorHandler';

export const userController = {
	// GET /api/users/me
	async me(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id;
			if (!userId) throw new AppError('Unauthorized', 401);

			const user = await userServices.getById(userId);
			if (!user) throw new AppError('User not found', 404);

			const publicUser = publicUserSelectSchema.parse(user);
			res.json({ success: true, user: publicUser });
		} catch (err) {
			next(err);
		}
	},
};
