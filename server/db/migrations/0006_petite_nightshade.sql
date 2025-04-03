ALTER TABLE "roles" ADD COLUMN "alias" text;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_alias_unique" UNIQUE("alias");