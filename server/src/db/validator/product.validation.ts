import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { productsTable } from './products.schema';
import { z } from 'zod';

export const productInsertSchema = createInsertSchema(productsTable, {
	name: (schema) => schema.min(1, 'Name is required'),
	price: () =>
		z.preprocess(
			(val) => (typeof val === 'string' ? Number(val) : val),
			z.number('Please enter a valid price').positive('Price must be positive')
		),
	description: (schema) =>
		schema.min(10, 'Description must be at least 10 characters').max(500, 'Description too long').optional(),
	image: (schema) => schema.url('Image must be a valid URL').optional(),
}).omit({ id: true });

export const productSelectSchema = createSelectSchema(productsTable);
