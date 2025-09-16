import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { userServices } from '../users/user.service';
import { publicUserSelectSchema } from '../../db/validator/user.validation';
import { NewUser } from '../../db/schema/user.schema';
import { success } from 'zod/index.cjs';

export const authController = {
	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const payload: NewUser = req.body;

			const existing = await userServices.getByEmail(payload.email);
			if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });

			const hashed = await bcrypt.hash(payload.password, 10);

			const toInsert: NewUser = {
				name: payload.name,
				email: payload.email,
				password: hashed,
				image: payload.image ?? null,
				role: payload.role ?? 'user',
				phone: payload.phone ?? null,
				address_street: payload.address_street ?? null,
				address_city: payload.address_city ?? null,
				address_state: payload.address_state ?? null,
				address_postal_code: payload.address_postal_code ?? null,
			};

			const user = await userServices.create(toInsert);

			const publicUser = publicUserSelectSchema.parse(user);
			return res.status(201).json({ success: true, message: 'User registered successfully', user: publicUser });
		} catch (error: any) {
			const pgCode = error?.cause?.code ?? error?.code;
			if (pgCode === '23505') {
				return res.status(409).json({ success: false, message: 'Email already in use' });
			}
			next(error);
		}
	},
};
