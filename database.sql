-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
	"first_name" varchar(25),
	"last_name" varchar(25),
	"email" varchar(400),
	"birthday" date,
	"password" varchar(1000),
	"created_at" date default current_date
);

CREATE TABLE "box_ribbon" (
    "id" SERIAL PRIMARY KEY,
	"media_url" varchar(2048)
);

CREATE TABLE "memento_box" (
    "id" SERIAL PRIMARY KEY,
	"box_color" varchar(25),
	"delivery_date" date,
	"collaborator_note" varchar(300) null,
	"user_id" integer references "user",
	"created_at" date default current_date,
	"box_ribbon_id" integer references "box_ribbon",
	"recipient_name" varchar(50),
	"recipient_email" varchar(50)
);

CREATE TABLE "media_type" (
    "id" SERIAL PRIMARY KEY,
	"type" varchar(200)
);

CREATE TABLE "collaborator" (
    "id" SERIAL PRIMARY KEY,
	"box_id" integer references "memento_box",
	"user_id" integer references "user",
	"invitation_code" varchar(1028),
	"email" varchar(400),
	"accepted" bool,
	"first_name" varchar(25),
	"last_name" varchar(25),
	"created_at" date default current_date
);

CREATE TABLE "box_item" (
    "id" SERIAL PRIMARY KEY,
	"box_id" integer references "memento_box",
	"physical_gift" integer,
	"user_id" integer references "user",
	"media_url" varchar(2048),
	"title" varchar(200),
	"description" varchar(1000),
	"media_type" integer references "media_type",
	"created_at" date default current_date,
	"box_code" varchar(1028)
);

CREATE TABLE "box_thanks" (
    "id" SERIAL PRIMARY KEY,
	"message" varchar(1000),
	"box_id" integer references "memento_box",
	"created_at" date default current_date
);

CREATE TABLE "user_box_thanks" (
    "id" SERIAL PRIMARY KEY,
	"box_thanks_id" integer references "box_thanks",
	"user_id" integer references "user"
);

-- Sample data
INSERT INTO "box_ribbon" ("media_url")
VALUES ('https://m.media-amazon.com/images/I/81GcbpZPU5L.jpg'),
('https://i5.walmartimages.com/seo/PMU-Pull-String-Bows-Gift-Wedding-Birthdays-Anniversaries-Ribbon-Flowers-Basket-Decoration-Large-Bow-Wrapping-5-Inch-20-Loops-Gold-Pkg-25_f6c34141-3c12-456a-98e8-0afeb2ce33ed.b8639a1a56c9df6e20754fa95fc2a344.jpeg'),
('https://eagawards.com/cdn/shop/products/Silver-Shovel-Bow_2048x.png?v=1690481975');

INSERT INTO "memento_box" ("box_color", "delivery_date", "collaborator_note", "user_id", "box_ribbon_id", "recipient_name", "recipient_email")
VALUES ('dark', '2024-08-19', 'Happy birthday, friend!', 1, 2, 'Jason', 'jason@email.com');

INSERT INTO "collaborator" ("box_id", "user_id", "email", "first_name", "last_name")
VALUES (1, 1, 'alex@smith.com', 'Alex', 'Smith'),
(1, 1, 'alex@martinez.com', 'Alex', 'Martinez'),
(1, 1, 'max@jones.com', 'Max', 'Jones'),
(1, 1, 'eliot@matthews.com', 'Eliot', 'Matthews');

