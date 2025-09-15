import { doublePrecision, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text('description'),
	image: varchar('image', { length: 255 }),
	price: doublePrecision('price').notNull(),
});

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
