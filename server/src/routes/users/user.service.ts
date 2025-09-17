import { db } from '../../config/db';
import { usersTable, User, NewUser } from '../../db/schema/user.schema';
import { eq } from 'drizzle-orm';

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
};
