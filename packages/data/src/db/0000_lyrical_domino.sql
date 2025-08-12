-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "goose_db_version" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_id" bigint NOT NULL,
	"is_applied" boolean NOT NULL,
	"tstamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"year" integer NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "seasons_url_key" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "circuits" (
	"id" integer PRIMARY KEY NOT NULL,
	"ref" text NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"country" text,
	"lat" numeric,
	"lng" numeric,
	"alt" integer,
	"url" text NOT NULL,
	CONSTRAINT "circuits_url_key" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "races" (
	"id" integer PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"round" integer DEFAULT 0 NOT NULL,
	"circuit_id" integer NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"date" date NOT NULL,
	"time" time,
	"url" text,
	"fp1_date" date,
	"fp1_time" time,
	"fp2_date" date,
	"fp2_time" time,
	"fp3_date" date,
	"fp3_time" time,
	"quali_date" date,
	"quali_time" time,
	"sprint_date" date,
	"sprint_time" time,
	CONSTRAINT "races_url_key" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "constructor_results" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"constructor_id" integer NOT NULL,
	"points" numeric,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "constructors" (
	"id" integer PRIMARY KEY NOT NULL,
	"ref" text NOT NULL,
	"name" text NOT NULL,
	"nationality" text,
	"url" text NOT NULL,
	CONSTRAINT "constructors_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "constructor_standings" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"constructor_id" integer NOT NULL,
	"points" numeric NOT NULL,
	"position" integer,
	"pos_text" text,
	"wins" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "driver_standings" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"points" numeric DEFAULT '0' NOT NULL,
	"position" integer,
	"pos_text" text,
	"wins" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" integer PRIMARY KEY NOT NULL,
	"ref" text DEFAULT '' NOT NULL,
	"number" integer,
	"code" text,
	"first_name" text DEFAULT '' NOT NULL,
	"last_name" text DEFAULT '' NOT NULL,
	"date_of_birth" date,
	"nationality" text,
	"url" text NOT NULL,
	CONSTRAINT "drivers_url_key" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "qualifying" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"constructor_id" integer NOT NULL,
	"number" integer DEFAULT 0 NOT NULL,
	"position" integer,
	"q1" text,
	"q2" text,
	"q3" text
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"constructor_id" integer NOT NULL,
	"number" integer,
	"grid" integer DEFAULT 0 NOT NULL,
	"position" integer,
	"pos_text" text DEFAULT '' NOT NULL,
	"pos_order" integer DEFAULT 0 NOT NULL,
	"points" numeric DEFAULT '0' NOT NULL,
	"laps" integer DEFAULT 0 NOT NULL,
	"time" text,
	"milliseconds" integer,
	"fastest_lap" integer,
	"rank" integer DEFAULT 0,
	"fastest_lap_time" text,
	"fastest_lap_speed" text,
	"status_id" integer
);
--> statement-breakpoint
CREATE TABLE "status" (
	"id" integer PRIMARY KEY NOT NULL,
	"status" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sprint_results" (
	"id" integer PRIMARY KEY NOT NULL,
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"constructor_id" integer NOT NULL,
	"number" integer DEFAULT 0 NOT NULL,
	"grid" integer DEFAULT 0 NOT NULL,
	"position" integer,
	"pos_text" text DEFAULT '' NOT NULL,
	"pos_order" integer DEFAULT 0 NOT NULL,
	"points" numeric DEFAULT '0' NOT NULL,
	"laps" integer DEFAULT 0 NOT NULL,
	"time" text,
	"milliseconds" integer,
	"fastest_lap" integer,
	"fastest_lap_time" text,
	"status_id" integer
);
--> statement-breakpoint
CREATE TABLE "lap_times" (
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"lap" integer NOT NULL,
	"position" integer,
	"time" text,
	"milliseconds" integer,
	CONSTRAINT "lap_times_pkey" PRIMARY KEY("race_id","driver_id","lap")
);
--> statement-breakpoint
CREATE TABLE "pit_stops" (
	"race_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"stop" integer NOT NULL,
	"lap" integer NOT NULL,
	"time" time NOT NULL,
	"duration" text,
	"milliseconds" integer,
	CONSTRAINT "pit_stops_pkey" PRIMARY KEY("race_id","driver_id","stop")
);
--> statement-breakpoint
ALTER TABLE "races" ADD CONSTRAINT "races_circuit_id_fkey" FOREIGN KEY ("circuit_id") REFERENCES "public"."circuits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constructor_results" ADD CONSTRAINT "constructor_results_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constructor_results" ADD CONSTRAINT "constructor_results_constructor_id_fkey" FOREIGN KEY ("constructor_id") REFERENCES "public"."constructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constructor_standings" ADD CONSTRAINT "constructor_standings_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "constructor_standings" ADD CONSTRAINT "constructor_standings_constructor_id_fkey" FOREIGN KEY ("constructor_id") REFERENCES "public"."constructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driver_standings" ADD CONSTRAINT "driver_standings_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "driver_standings" ADD CONSTRAINT "driver_standings_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qualifying" ADD CONSTRAINT "qualifying_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qualifying" ADD CONSTRAINT "qualifying_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "qualifying" ADD CONSTRAINT "qualifying_constructor_id_fkey" FOREIGN KEY ("constructor_id") REFERENCES "public"."constructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_constructor_id_fkey" FOREIGN KEY ("constructor_id") REFERENCES "public"."constructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_results" ADD CONSTRAINT "sprint_results_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_results" ADD CONSTRAINT "sprint_results_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_results" ADD CONSTRAINT "sprint_results_constructor_id_fkey" FOREIGN KEY ("constructor_id") REFERENCES "public"."constructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sprint_results" ADD CONSTRAINT "sprint_results_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lap_times" ADD CONSTRAINT "lap_times_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lap_times" ADD CONSTRAINT "lap_times_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pit_stops" ADD CONSTRAINT "pit_stops_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "public"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pit_stops" ADD CONSTRAINT "pit_stops_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;
*/