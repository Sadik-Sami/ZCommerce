import bcrypt from 'bcryptjs';
import { db } from '../../config/db';
import { usersTable, User, NewUser } from '../../db/schema/user.schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../../middleware/errorHandler';

export const userServices = {
	async getByEmail(email: string): Promise<User | undefined> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.email, email));
		return rows[0];
	},
	async getById(id: string): Promise<User | undefined> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.id, id));
		return rows[0];
	},
	async create(data: NewUser): Promise<User> {
		const inserted = await db.insert(usersTable).values(data).returning();
		return inserted[0];
	},
	async updateProfile(id: string, data: Partial<NewUser>): Promise<User | undefined> {
		const [updated] = await db
			.update(usersTable)
			.set({ ...data, updated_at: new Date() })
			.where(eq(usersTable.id, id))
			.returning();
		return updated;
	},
	async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
		const rows = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
		const user = rows[0];
		if (!user) throw new AppError('User not found', 404);

		const ok = await bcrypt.compare(currentPassword, user.password);
		if (!ok) throw new AppError('Current password is incorrect', 400);

		const hashed = await bcrypt.hash(newPassword, 10);
		await db.update(usersTable).set({ password: hashed, updated_at: new Date() }).where(eq(usersTable.id, id));
	},
	async listAll(): Promise<User[]> {
		return db.select().from(usersTable);
	},
};
