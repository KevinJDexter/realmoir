--------------- USERS ---------------

CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(80) NOT NULL,
	"last_name" VARCHAR (120) NOT NULL,
	"username" VARCHAR (120) NOT NULL,
	"email" VARCHAR (200) NOT NULL,
	"password" VARCHAR (120) NOT NULL,
	"content_private" BOOLEAN DEFAULT 'false' NOT NULL
);

INSERT INTO "users" ("first_name", "last_name", "username", "email", "password")
VALUES ('Test', 'User', 'test', 'test@test.com', 'test');




--------------- WORLDS ---------------

CREATE TABLE "worlds" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (120) NOT NULL,
	"description" VARCHAR(5000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR(10000),
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"user_id" INTEGER REFERENCES "public"."users"("id") NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "worlds" ("name", "description", "img_url", "private_notes", "user_id")
VALUES ('Testland', 'A world created solely with the purpose of being tested', 'heckofanimage.jpg', 'These are secret! Shhhh...', 2);




--------------- GENRES ---------------

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL
);

INSERT INTO "genres" ("name")
VALUES ('Fantasy'), ('Science Fiction'), ('Drama'), ('Romance'), ('Action and Adventure'), ('Fiction'), ('Satire'), ('Horror'), ('Mystery'), ('Anthology');




--------------- STORIES ---------------

CREATE TABLE "stories" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (120) NOT NULL,
	"synopsis" VARCHAR(5000) NOT NULL,
	"genre_id" INTEGER REFERENCES "public"."genres"("id"),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "stories" ("title", "synopsis", "genre_id", "img_url", "private_notes", "world_id")
VALUES ('Test Story', 'A story where a lot was tested', 10, 'heckofanimage.jpg', 'Shhh...These are secret', 2);




--------------- LOCATIONS ---------------

CREATE TABLE "locations" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"history" VARCHAR (10000),
	"climate" VARCHAR (200),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "locations" ("name", "description", "history", "climate", "img_url", "private_notes", "world_id")
VALUES ('Test Town', 'A town of testing', 'A lot of testing happened here', 'Test Winds', 'heckofanimage.jpg', 'secret notes!!!', 2);




--------------- NEIGHBORING LOCATIONS ---------------

CREATE TABLE "neighboring_locations" (
	"first_location" INTEGER REFERENCES "public"."locations"("id") NOT NULL,
	"second_location" INTEGER REFERENCES "public"."locations"("id") NOT NULL,
	"is_contained_in" BOOLEAN NOT NULL
);

INSERT INTO "neighboring_locations" ("first_location", "second_location", "is_contained_in")
VALUES (1, 2, false);




--------------- LOCATIONS - STORIES JUNCTION ---------------

CREATE TABLE "locations_stories_junction" (
	"location_id" INTEGER REFERENCES "public"."locations"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "locations_stories_junction" ("location_id", "story_id")
VALUES (1, 1);




--------------- CHARACTERS ---------------

CREATE TABLE "characters" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200) NOT NULL,
	"alias" VARCHAR (400),
	"eye_color" VARCHAR (40),
	"hair_color" VARCHAR (80),
	"skin_color" VARCHAR (80),
	"birth_date" VARCHAR (100),
	"death_date" VARCHAR (100),
	"age" INTEGER,
	"height" VARCHAR (40),
	"gender" VARCHAR (40),
	"home" INTEGER REFERENCES "public"."locations"("id"),
	"description" VARCHAR (10000),
	"bio" VARCHAR (10000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "characters" ("name", "alias", "eye_color", "hair_color", "skin_color", "birth_date", 
"death_date", "age", "height", "gender", "home", "description", "bio", "img_url", "private_notes", "world_id")
VALUES ('Test Testerson', 'TestMan', 'Testing blue', 'Testing White', 'Testing Green', '1000 Test', '2000 Test', 
23, 'five feet', 'Test-gendered', 1, 'He wears a cape', 'A hero that tests for a living', 'heckofanimage.jpg', 'More private stuff', 2);




--------------- RELATIONSHIPS ---------------

CREATE TABLE "relationships" (
	"first_character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL,
	"second_character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL,
	"relationship" VARCHAR (100)
);

INSERT INTO "relationships" ("first_character_id", "second_character_id", "relationship")
VALUES (1, 2, 'Rivals');




--------------- CHARACTERS - LOCATIONS JUNCTION ---------------

CREATE TABLE "characters_locations_junction" (
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL,
	"location_id" INTEGER REFERENCES "public"."locations"("id") NOT NULL
);

INSERT INTO "characters_locations_junction" ("character_id", "location_id")
VALUES (1, 1);




--------------- CHARACTERS - STORIES JUNCTION ---------------

CREATE TABLE "characters_stories_junction" (
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "characters_stories_junction" ("character_id", "story_id")
VALUES (1, 1);




--------------- EVENTS ---------------

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (400) NOT NULL,
	"description" VARCHAR (10000),
	"location" INTEGER REFERENCES "public"."locations"("id"),
	"date_of_event" VARCHAR (200),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "events" ("name", "description", "location", "date_of_event", "img_url", "private_notes", "world_id")
VALUES ('War of Tests', 'A war about testing', 1, '1300 Test', 'heckofanimage.jpg', 'More secret notes to hide', 2);




--------------- CHARACTERS - EVENTS JUNCTION ---------------

CREATE TABLE "characters_events_junction" (
	"event_id" INTEGER REFERENCES "public"."events"("id") NOT NULL,
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL
);

INSERT INTO "characters_events_junction" ("event_id", "character_id")
VALUES (2, 1);




--------------- EVENTS - STORIES JUNCTION ---------------

CREATE TABLE "events_stories_junction" (
	"event_id" INTEGER REFERENCES "public"."events"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "events_stories_junction" ("event_id", "story_id")
VALUES (2, 1);




--------------- LORE ---------------

CREATE TABLE "lore" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200),
	"synopsis" VARCHAR (2000),
	"description" VARCHAR (100000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "lore" ("name", "synopsis", "description", "img_url", "private_notes", "world_id")
VALUES ('TestTest', 'Test test testing', 'The Test to test the testing of tests', 'heckofanimage.jpg', 'super secret lore notes', 2);




--------------- CONTAINED WORLDS ---------------

CREATE TABLE "contained_worlds" (
	"outer_world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"inner_world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL
);

INSERT INTO "contained_worlds" ("outer_world_id", "inner_world_id")
VALUES (2, 2);




--------------- GROUPS ---------------

CREATE TABLE "groups" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (2000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "groups" ("name", "description", "img_url", "private_notes", "world_id")
VALUES ('Test Heroes', 'A team that tests', 'heckofanimage.jpg', 'secret team', 2);




--------------- CHARACTERS - GROUPS JUNCTION ---------------

CREATE TABLE "characters_groups_junction" (
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL,
	"group_id" INTEGER REFERENCES "public"."groups"("id") NOT NULL
);

INSERT INTO "characters_groups_junction" ("character_id", "group_id")
VALUES (1, 2);




--------------- GROUPS - STORIES JUNCTION ---------------

CREATE TABLE "groups_stories_junction" (
	"group_id" INTEGER REFERENCES "public"."groups"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "groups_stories_junction" ("group_id", "story_id")
VALUES (2, 1);




--------------- CREATURE TYPES ---------------

CREATE TABLE "creature_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL
);

INSERT INTO "creature_types" ("type", "description", "img_url", "private_notes", "world_id")
VALUES ('Test monster', 'Beasts that test', 'heckofanimage.jpg', 'secret beasties', 2);




--------------- CREATURE ITEMS ---------------

CREATE TABLE "creature_items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"creature_type_id" INTEGER REFERENCES "public"."creature_types"("id") NOT NULL,
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "creature_items" ("name", "description", "creature_type_id", "img_url", "private_notes")
VALUES ('Testzilla', 'A super-sized test monster', 1, 'heckofanimage.jpg', 'scary secret notes');




--------------- CREATURES - LOCATIONS JUNCTION ---------------

CREATE TABLE "creatures_locations_junction" (
	"creature_item_id" INTEGER REFERENCES "public"."creature_items"("id") NOT NULL,
	"location_id" INTEGER REFERENCES "public"."locations"("id") NOT NULL
);

INSERT INTO "creatures_locations_junction" ("creature_item_id", "location_id")
VALUES (1, 1);




--------------- CREATURES - STORIES JUNCTION ---------------

CREATE TABLE "creatures_stories_junction" (
	"creature_item_id" INTEGER REFERENCES "public"."creature_items"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "creatures_stories_junction" ("creature_item_id", "story_id")
VALUES (1, 1);




--------------- ITEM TYPES ---------------

CREATE TABLE "item_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL
);

INSERT INTO "item_types" ("type", "description", "img_url", "private_notes", "world_id")
VALUES ('Test Gadgets', 'Gadgets that test', 'heckofanimage.jpg', 'secret gadget', 2);




--------------- ITEM ITEMS ---------------

CREATE TABLE "item_items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"item_type_id" INTEGER REFERENCES "public"."item_types"("id") NOT NULL,
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "item_items" ("name", "description", "item_type_id", "img_url", "private_notes")
VALUES ('Test Laser', 'A super-sized test laser', 2, 'heckofanimage.jpg', 'laser secret notes');




--------------- ITEMS - CHARACTERS JUNCTION ---------------

CREATE TABLE "items_characters_junction" (
	"item_id" INTEGER REFERENCES "public"."item_items"("id") NOT NULL,
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL
);

INSERT INTO "items_characters_junction" ("item_id", "character_id")
VALUES (1, 1);




--------------- ITEMS - LOCATIONS JUNCTION ---------------

CREATE TABLE "items_locations_junction" (
	"item_id" INTEGER REFERENCES "public"."item_items"("id") NOT NULL,
	"location_id" INTEGER REFERENCES "public"."locations"("id") NOT NULL
);

INSERT INTO "items_locations_junction" ("item_id", "location_id")
VALUES (1, 1);




--------------- ITEMS - STORIES JUNCTION ---------------

CREATE TABLE "items_stories_junction" (
	"item_id" INTEGER REFERENCES "public"."item_items"("id") NOT NULL,
	"story_id" INTEGER REFERENCES "public"."stories"("id") NOT NULL
);

INSERT INTO "items_stories_junction" ("item_id", "story_id")
VALUES (1, 1);




--------------- TALENT TYPES ---------------

CREATE TABLE "talent_types" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL
);

INSERT INTO "talent_types" ("type", "description", "img_url", "private_notes", "world_id")
VALUES ('Test powers', 'Powers that test', 'heckofanimage.jpg', 'secret power', 2);




--------------- TALENT ITEMS ---------------

CREATE TABLE "talent_items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"talent_type_id" INTEGER REFERENCES "public"."talent_types"("id") NOT NULL,
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (10000),
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL,
	"date_created" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "talent_items" ("name", "description", "talent_type_id", "img_url", "private_notes")
VALUES ('Test Vision', 'Able to see tests', 1, 'heckofanimage.jpg', 'distant secret notes');




--------------- TALENT - CHARACTERS JUNCTION ---------------

CREATE TABLE "talents_characters_junction" (
	"talent_item_id" INTEGER REFERENCES "public"."talent_items"("id") NOT NULL,
	"character_id" INTEGER REFERENCES "public"."characters"("id") NOT NULL
);

INSERT INTO "talents_characters_junction" ("talent_item_id", "character_id")
VALUES (1, 1);




--------------- FAVORITES ---------------

CREATE TABLE "favorites" (
	"user_id" INTEGER REFERENCES "public"."users"("id") NOT NULL,
	"table" VARCHAR (80) NOT NULL,
	"table_item_id" INTEGER NOT NULL,
	"date_favorited" TIMESTAMP DEFAULT NOW() NOT NULL
);

INSERT INTO "favorites" ("user_id", "table", "table_item_id")
VALUES (2, 'locations', 1);




--------------- TIMELINE ---------------

CREATE TABLE "timelines" (
	"id" SERIAL PRIMARY KEY,
	"suffix" VARCHAR (20),
	"prefix" VARCHAR (20),
	"preceeds" INTEGER REFERENCES "public"."timelines"("id"),
	"follows" INTEGER REFERENCES "public"."timelines"("id"),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL
);

INSERT INTO "timelines" ("suffix", "prefix", "preceeds", "follows", "world_id")
VALUES ('AD', '', NULL, NULL, 2);




--------------- MONTHS ---------------

CREATE TABLE "months" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (100) NOT NULL,
	"min_date" INTEGER DEFAULT 1 NOT NULL,
	"max_date" INTEGER NOT NULL,
	"timeline_id" INTEGER REFERENCES "public"."timelines"("id") NOT NULL
);

INSERT INTO "months" ("name", "min_date", "max_date", "timeline_id")
VALUES ('Testmonth', 1, 32, 1);




--------------- SERIES ---------------

CREATE TABLE "series" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (10000),
	"genre_id" INTEGER REFERENCES "public"."genres"("id"),
	"number_books_planned" INTEGER,
	"img_url" VARCHAR (2000),
	"private_notes" VARCHAR (50000),
	"world_id" INTEGER REFERENCES "public"."worlds"("id") NOT NULL,
	"is_private" BOOLEAN DEFAULT 'false' NOT NULL
);

INSERT INTO "series" ("name", "description", "genre_id", "number_books_planned", "img_url", "private_notes", "world_id")
VALUES ('Testing Chronicles', 'The chronicles of the testing world', 1, 5, 'heckofanimage.jpg', 'Secret chronicles', 2);

ALTER TABLE "public"."stories"
  ADD COLUMN "series_id" integer,
  ADD FOREIGN KEY ("series_id") REFERENCES "public"."series"("id");










--------------- ON DELETE CASCADE/NULL ACTIONS ---------------

ALTER TABLE "public"."characters"
  DROP CONSTRAINT "characters_home_fkey",
  DROP CONSTRAINT "characters_world_id_fkey",
  ADD CONSTRAINT "characters_home_fkey" FOREIGN KEY ("home") REFERENCES "public"."locations"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "characters_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."characters_events_junction"
  DROP CONSTRAINT "characters_events_junction_event_id_fkey",
  DROP CONSTRAINT "characters_events_junction_character_id_fkey",
  ADD CONSTRAINT "characters_events_junction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "characters_events_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE;

ALTER TABLE "public"."characters_groups_junction"
  DROP CONSTRAINT "characters_groups_junction_character_id_fkey",
  DROP CONSTRAINT "characters_groups_junction_group_id_fkey",
  ADD CONSTRAINT "characters_groups_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "characters_groups_junction_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE;

ALTER TABLE "public"."characters_locations_junction"
  DROP CONSTRAINT "characters_locations_junction_character_id_fkey",
  DROP CONSTRAINT "characters_locations_junction_location_id_fkey",
  ADD CONSTRAINT "characters_locations_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "characters_locations_junction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE CASCADE;

ALTER TABLE "public"."characters_stories_junction"
  DROP CONSTRAINT "characters_stories_junction_character_id_fkey",
  DROP CONSTRAINT "characters_stories_junction_story_id_fkey",
  ADD CONSTRAINT "characters_stories_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "characters_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;

ALTER TABLE "public"."contained_worlds"
  DROP CONSTRAINT "contained_worlds_outer_world_id_fkey",
  DROP CONSTRAINT "contained_worlds_inner_world_id_fkey",
  ADD CONSTRAINT "contained_worlds_outer_world_id_fkey" FOREIGN KEY ("outer_world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "contained_worlds_inner_world_id_fkey" FOREIGN KEY ("inner_world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."creature_items"
  DROP CONSTRAINT "creature_items_creature_type_id_fkey",
  ADD CONSTRAINT "creature_items_creature_type_id_fkey" FOREIGN KEY ("creature_type_id") REFERENCES "public"."creature_types"("id") ON DELETE CASCADE;

ALTER TABLE "public"."creature_types"
  DROP CONSTRAINT "creature_types_world_id_fkey",
  ADD CONSTRAINT "creature_types_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."creatures_locations_junction"
  DROP CONSTRAINT "creatures_locations_junction_creature_item_id_fkey",
  DROP CONSTRAINT "creatures_locations_junction_location_id_fkey",
  ADD CONSTRAINT "creatures_locations_junction_creature_item_id_fkey" FOREIGN KEY ("creature_item_id") REFERENCES "public"."creature_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "creatures_locations_junction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE CASCADE;

ALTER TABLE "public"."creatures_stories_junction"
  DROP CONSTRAINT "creatures_stories_junction_creature_item_id_fkey",
  DROP CONSTRAINT "creatures_stories_junction_story_id_fkey",
  ADD CONSTRAINT "creatures_stories_junction_creature_item_id_fkey" FOREIGN KEY ("creature_item_id") REFERENCES "public"."creature_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "creatures_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;

ALTER TABLE "public"."events"
  DROP CONSTRAINT "events_location_fkey",
  DROP CONSTRAINT "events_world_id_fkey",
  ADD CONSTRAINT "events_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."locations"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "events_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."events_stories_junction"
  DROP CONSTRAINT "events_stories_junction_event_id_fkey",
  DROP CONSTRAINT "events_stories_junction_story_id_fkey",
  ADD CONSTRAINT "events_stories_junction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "events_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;

ALTER TABLE "public"."groups"
  DROP CONSTRAINT "groups_world_id_fkey",
  ADD CONSTRAINT "groups_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."groups_stories_junction"
  DROP CONSTRAINT "groups_stories_junction_group_id_fkey",
  DROP CONSTRAINT "groups_stories_junction_story_id_fkey",
  ADD CONSTRAINT "groups_stories_junction_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "groups_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;

ALTER TABLE "public"."item_items"
  DROP CONSTRAINT "item_items_item_type_id_fkey",
  ADD CONSTRAINT "item_items_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "public"."item_types"("id") ON DELETE CASCADE;

ALTER TABLE "public"."item_types"
  DROP CONSTRAINT "item_types_world_id_fkey",
  ADD CONSTRAINT "item_types_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."items_characters_junction"
  DROP CONSTRAINT "items_characters_junction_item_id_fkey",
  DROP CONSTRAINT "items_characters_junction_character_id_fkey",
  ADD CONSTRAINT "items_characters_junction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."item_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "items_characters_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE;

ALTER TABLE "public"."items_locations_junction"
  DROP CONSTRAINT "items_locations_junction_item_id_fkey",
  DROP CONSTRAINT "items_locations_junction_location_id_fkey",
  ADD CONSTRAINT "items_locations_junction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."item_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "items_locations_junction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE CASCADE;

ALTER TABLE "public"."items_stories_junction"
  DROP CONSTRAINT "items_stories_junction_item_id_fkey",
  DROP CONSTRAINT "items_stories_junction_story_id_fkey",
  ADD CONSTRAINT "items_stories_junction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."item_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "items_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;
  
ALTER TABLE "public"."locations"
  DROP CONSTRAINT "locations_world_id_fkey",
  ADD CONSTRAINT "locations_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."locations_stories_junction"
  DROP CONSTRAINT "locations_stories_junction_location_id_fkey",
  DROP CONSTRAINT "locations_stories_junction_story_id_fkey",
  ADD CONSTRAINT "locations_stories_junction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "locations_stories_junction_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE CASCADE;

ALTER TABLE "public"."lore"
  DROP CONSTRAINT "lore_world_id_fkey",
  ADD CONSTRAINT "lore_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."months"
  DROP CONSTRAINT "months_timeline_id_fkey",
  ADD CONSTRAINT "months_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "public"."timelines"("id") ON DELETE CASCADE;

ALTER TABLE "public"."neighboring_locations"
  DROP CONSTRAINT "neighboring_locations_first_location_fkey",
  DROP CONSTRAINT "neighboring_locations_second_location_fkey",
  ADD CONSTRAINT "neighboring_locations_first_location_fkey" FOREIGN KEY ("first_location") REFERENCES "public"."locations"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "neighboring_locations_second_location_fkey" FOREIGN KEY ("second_location") REFERENCES "public"."locations"("id") ON DELETE CASCADE;

ALTER TABLE "public"."relationships"
  DROP CONSTRAINT "relationships_first_character_id_fkey",
  DROP CONSTRAINT "relationships_second_character_id_fkey",
  ADD CONSTRAINT "relationships_first_character_id_fkey" FOREIGN KEY ("first_character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "relationships_second_character_id_fkey" FOREIGN KEY ("second_character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE;

ALTER TABLE "public"."series"
  DROP CONSTRAINT "series_genre_id_fkey",
  DROP CONSTRAINT "series_world_id_fkey",
  ADD CONSTRAINT "series_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "series_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."stories"
  DROP CONSTRAINT "stories_genre_id_fkey",
  DROP CONSTRAINT "stories_world_id_fkey",
  DROP CONSTRAINT "stories_series_id_fkey",
  ADD CONSTRAINT "stories_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "stories_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "stories_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE SET NULL;

ALTER TABLE "public"."talent_items"
  DROP CONSTRAINT "talent_items_talent_type_id_fkey",
  ADD CONSTRAINT "talent_items_talent_type_id_fkey" FOREIGN KEY ("talent_type_id") REFERENCES "public"."talent_types"("id") ON DELETE CASCADE;

ALTER TABLE "public"."talent_types"
  DROP CONSTRAINT "talent_types_world_id_fkey",
  ADD CONSTRAINT "talent_types_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;

ALTER TABLE "public"."talents_characters_junction"
  DROP CONSTRAINT "talents_characters_junction_talent_item_id_fkey",
  DROP CONSTRAINT "talents_characters_junction_character_id_fkey",
  ADD CONSTRAINT "talents_characters_junction_talent_item_id_fkey" FOREIGN KEY ("talent_item_id") REFERENCES "public"."talent_items"("id") ON DELETE CASCADE,
  ADD CONSTRAINT "talents_characters_junction_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE CASCADE;
  
ALTER TABLE "public"."timelines"
  DROP CONSTRAINT "timelines_preceeds_fkey",
  DROP CONSTRAINT "timelines_follows_fkey",
  DROP CONSTRAINT "timelines_world_id_fkey",
  ADD CONSTRAINT "timelines_preceeds_fkey" FOREIGN KEY ("preceeds") REFERENCES "public"."timelines"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "timelines_follows_fkey" FOREIGN KEY ("follows") REFERENCES "public"."timelines"("id") ON DELETE SET NULL,
  ADD CONSTRAINT "timelines_world_id_fkey" FOREIGN KEY ("world_id") REFERENCES "public"."worlds"("id") ON DELETE CASCADE;
  
ALTER TABLE "public"."worlds"
  DROP CONSTRAINT "worlds_user_id_fkey",
  ADD CONSTRAINT "worlds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



--------------- ADD LAST UPDATED ---------------


ALTER TABLE "public"."characters" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."creature_items" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."events" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."groups" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."item_items" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."locations" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."lore" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."stories" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."talent_items" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

ALTER TABLE "public"."worlds" ADD COLUMN "last_updated" timestamp without time zone NOT NULL DEFAULT now();

