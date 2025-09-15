import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: [
		'./src/db/schema/product.schema.ts',
		'./src/db/schema/user.schema.ts',
		'./src/db/schema/session.schema.ts'
	],
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
