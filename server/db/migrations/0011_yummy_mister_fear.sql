CREATE TABLE "menu_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"icon" text,
	"to" text NOT NULL,
	"parent_id" integer,
	"order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_menu_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE no action ON UPDATE no action;