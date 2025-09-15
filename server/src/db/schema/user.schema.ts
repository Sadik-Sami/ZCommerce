import { relations } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';
import { sessionsTable } from './session.schema';

export const usersTable = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	image: varchar('image', { length: 255 }),
	role: varchar('', { length: 255 }).default('user').notNull(),

	phone: varchar('phone', { length: 50 }).default(''),
	address_street: varchar('address_street', { length: 255 }).default(''),
	address_city: varchar('address_city', { length: 100 }).default(''),
	address_state: varchar('address_state', { length: 100 }).default(''),
	address_postal_code: varchar('address_postal_code', { length: 30 }).default(''),

	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const userRelations = relations(usersTable, ({ many }) => ({
	sessions: many(sessionsTable),
}));
