import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './user.schema';
import { relations } from 'drizzle-orm';

export const sessionsTable = pgTable('sessions', {
	id: uuid('id').defaultRandom().primaryKey(),
	user_id: uuid('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	refresh_token: text('refresh_token'),
	user_agent: text('user_agent'),
	ip: varchar('ip', { length: 50 }),
	expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
	created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.user_id],
		references: [usersTable.id],
	}),
}));
