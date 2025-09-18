import type { User } from '../db/schema/user.schema';

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				role: string;
			} | null;
		}
	}
}
