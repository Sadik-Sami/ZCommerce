import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
	statusCode: number;
	details?: any;
	constructor(message: string, statusCode = 500, details?: any) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	// Logging server-side
	console.error(err);

	// Zod error
	if (err?.name === 'ZodError') {
		return res.status(400).json({ success: false, message: 'Invalid data', details: err.issues });
	}

	// Drizzle/postgres unique violation
	const pgCode = err?.cause?.code ?? err?.code;
	if (pgCode === '23505') {
		return res.status(409).json({ success: false, message: 'Conflict: resource already exists' });
	}

	// AppError - controlled errors
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({ success: false, message: err.message, details: err.details });
	}

	const isProd = process.env.NODE_ENV === 'production';
	return res.status(500).json({
		success: false,
		message: 'Something went wrong',
		// in dev to help debugging (will hide details in prod)
		...(isProd ? null : { error: err?.message, stack: err?.stack }),
	});
}
