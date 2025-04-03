CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;