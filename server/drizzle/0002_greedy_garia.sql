ALTER TABLE "sessions" RENAME COLUMN "token" TO "access_token";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "address_street" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "address_city" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "address_state" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "address_postal_code" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_agent" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "ip" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "refresh_token" text;