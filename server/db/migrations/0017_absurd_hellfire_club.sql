CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
