export interface JwtPayload {
	id: string;
	role: 'user' | 'admin';
	iat?: number;
	exp?: number;
}
