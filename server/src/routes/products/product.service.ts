import { db } from '../../config/db';
import { NewProduct, Product, productsTable } from '../../db/schema/product.schema';
import { eq } from 'drizzle-orm';

export const productServices = {
	async getAll(): Promise<Product[]> {
		return db.select().from(productsTable);
	},

	async getById(id: string): Promise<Product | undefined> {
		const [result] = await db.select().from(productsTable).where(eq(productsTable.id, id));
		return result;
	},

	async create(data: NewProduct): Promise<Product> {
		const [inserted] = await db.insert(productsTable).values(data).returning();
		return inserted;
	},

	async update(id: string, data: Partial<NewProduct>): Promise<Product | undefined> {
		const [updated] = await db.update(productsTable).set(data).where(eq(productsTable.id, id)).returning();
		return updated;
	},

	async delete(id: string): Promise<Product | undefined> {
		const [deleted] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
		return deleted;
	},
};
