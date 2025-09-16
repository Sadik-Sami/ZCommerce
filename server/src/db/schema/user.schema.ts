import { relations } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sessionsTable } from './session.schema';

export const userRoleEnum = pgEnum('role', ['admin', 'user']);

export const usersTable = pgTable('users', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	image: varchar('image', { length: 255 }),
	role: userRoleEnum('role').default('user').notNull(),

	phone: varchar('phone', { length: 50 }),
	address_street: varchar('address_street', { length: 255 }),
	address_city: varchar('address_city', { length: 100 }),
	address_state: varchar('address_state', { length: 100 }),
	address_postal_code: varchar('address_postal_code', { length: 30 }),

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
