import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { usersTable } from '../schema/user.schema';

export const userInsertSchema = createInsertSchema(usersTable, {
	name: (schema) => schema.min(1, 'Name is required'),
	email: (schema) => schema.email('Please enter a valid email'),
	password: (schema) => schema.min(8, 'Password must be at least 8 characters'),
	phone: (schema) => schema.optional(),
	role: (schema) => schema.optional(),
	image: (schema) => schema.optional(),
	address_street: (schema) => schema.optional(),
	address_city: (schema) => schema.optional(),
	address_state: (schema) => schema.optional(),
	address_postal_code: (schema) => schema.optional(),
})
	.omit({ id: true, created_at: true })
	.refine((val) => !!val.email && !!val.password && !!val.name, {
		message: 'name, email and password are required',
	});

export const userSelectSchema = createSelectSchema(usersTable);
export const publicUserSelectSchema = userSelectSchema.omit({ password: true });
