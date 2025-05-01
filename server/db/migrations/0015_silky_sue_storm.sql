ALTER TABLE "menu_items" RENAME COLUMN "is_active" TO "active";--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "icon" text;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;