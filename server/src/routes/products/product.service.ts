import { db } from '../../config/db';
import { NewProduct, Product, productsTable } from '../../db/schema/product.schema';
import { eq } from 'drizzle-orm';

export const productServices = {
	async getAll(): Promise<Product[]> {
		return db.select().from(productsTable);
	},

	async getById(id: number): Promise<Product | undefined> {
		const result = await db.select().from(productsTable).where(eq(productsTable.id, id));
		return result[0];
	},

	async create(data: NewProduct): Promise<Product> {
		const inserted = await db.insert(productsTable).values(data).returning();
		return inserted[0];
	},

	async update(id: number, data: Partial<NewProduct>): Promise<Product | undefined> {
		const updated = await db.update(productsTable).set(data).where(eq(productsTable.id, id)).returning();
		return updated[0];
	},

	async delete(id: number): Promise<Product | undefined> {
		const deleted = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
		return deleted[0];
	},
};
