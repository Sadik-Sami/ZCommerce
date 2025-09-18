import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { verifyAccessToken } from '../utils/token';
import { db } from '../config/db';
import { sessionsTable } from '../db/schema/session.schema';
import { usersTable } from '../db/schema/user.schema';
import { eq } from 'drizzle-orm';
import { AppError } from './errorHandler';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	try {
		//Try Authorization header
		const authHeader = req.get('authorization');
		if (authHeader?.startsWith('Bearer ')) {
			const [scheme, token] = authHeader?.split(' ');

			if (scheme.toLowerCase() !== 'bearer' || !token) {
				throw new AppError('Invalid authorization header', 401);
			}

			try {
				const payload = verifyAccessToken(token);
				if (!payload.id) throw new AppError('Invalid token payload', 401);

				req.user = { id: payload.id, role: payload.role };
				return next();
			} catch (err) {
				// token invalid or expired — fallback to cookies
			}
		}

		//Fallback: cookies
		const sessionId = req.cookies?.sessionId;
		const refresh = req.cookies?.refresh_token;
		if (sessionId && refresh) {
			const rows = await db.select().from(sessionsTable).where(eq(sessionsTable.id, sessionId)).limit(1);
			const session = rows[0];
			if (!session) throw new AppError('Invalid session', 401);

			// checking expiry
			if (new Date(session.expires_at) < new Date()) {
				throw new AppError('Session expired', 401);
			}

			// comparaing with hashed token
			const hashed = session.refresh_token ?? '';
			const ok = await bcrypt.compare(refresh, hashed);
			if (!ok) {
				// suspicious: revoke session
				await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
				throw new AppError('Invalid authentication', 401);
			}

			// fetch user role
			const userRows = await db.select().from(usersTable).where(eq(usersTable.id, session.user_id)).limit(1);
			const user = userRows[0];
			if (!user) throw new AppError('User not found', 404);

			req.user = { id: user.id, role: user.role };
			return next();
		}
		// No credentials
		throw new AppError('Unauthorized', 401);
	} catch (err) {
		next(err);
	}
}

export const authorize = (...allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) return next(new AppError('Unauthorized', 401));
		if (!allowedRoles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
		return next();
	};
};
