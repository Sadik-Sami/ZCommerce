import { InferModel } from 'drizzle-orm';
import { doublePrecision, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	image: varchar({ length: 255 }),
	price: doublePrecision().notNull(),
});

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
