import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password is required'),
});

export type LoginRequest = z.infer<typeof loginSchema>;
