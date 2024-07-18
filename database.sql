-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Done
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
	"first_name" varchar(25),
	"last_name" varchar(25),
	-- "email" varchar(400), -- username will be the email
	"birthday" date,
	"password" varchar(1000),
	"created_at" date default current_date
);

-- Done
CREATE TABLE "box_ribbon" (
    "id" SERIAL PRIMARY KEY,
	"media_url" varchar(2048) -- either local path or absolute path
);

CREATE TABLE "occasion" (
    "id" SERIAL PRIMARY KEY,
	"name" varchar(200) -- birthday, etc.
);

CREATE TABLE "memento_box" (
    "id" SERIAL PRIMARY KEY,
	-- "box_color" varchar(25), -- not needed, this is behind the ribbon in the image
	"delivery_date" date, -- when is the occasion
	"collaborator_note" varchar(1000) null, -- write a message...
	"user_id" integer references "user", -- req.user.id of logged in user
	"created_at" date default current_date, -- auto populated, not needed in query
	"box_ribbon_id" integer references "box_ribbon", -- ribbon selection
	"recipient_name" varchar(100), -- who we are celebrating
	"recipient_email" varchar(100), -- input field below name
	"occasion_id" integer references "occasion",
	"unique_id" varchar(1000) -- create this on the server (stretch)
);

CREATE TABLE "media_type" (
    "id" SERIAL PRIMARY KEY,
	"type" varchar(200)
);

INSERT INTO "media_type" ("type")
VALUES 
('photo'),
('video'),
('photoLetter'),
('textLetter'),
('voice');

-- really nice to have but likely not a blocker (stretch)
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
	-- "physical_gift" integer, -- Out of scope
	"user_id" integer references "user",
	"media_url" varchar(2048),
	-- "title" varchar(200), -- I don't think this is needed
	"description" varchar(1000),
	"media_type" integer references "media_type",
	"created_at" date default current_date
	-- "box_code" varchar(1028) -- I don't think this is needed
);

-- Stretch
CREATE TABLE "box_thanks" (
    "id" SERIAL PRIMARY KEY,
	"message" varchar(1000),
	"box_id" integer references "memento_box",
	"created_at" date default current_date
);

-- Stretch
CREATE TABLE "user_box_thanks" (
    "id" SERIAL PRIMARY KEY,
	"box_thanks_id" integer references "box_thanks",
	"user_id" integer references "user"
);

-- Sample data

-- TODO: Ken
INSERT INTO "box_ribbon" ("media_url")
VALUES ('./boxes/black-blue-ribbon.png'),
('./boxes/black-gold-bow.png'),
('./boxes/black-gold-ribbon.png'),
('./boxes/black-red-ribbon.png'),
('./boxes/black-ribbon.png'),
('./boxes/black-w&g-angled.png'),
('./boxes/black-w&g-ribbon.png'),
('./boxes/black-white-ribbon.png'),
('./boxes/white-black-ribbon.png'),
('./boxes/white-blue-ribbon.png'),
('./boxes/white-gold-bow.png'),
('./boxes/white-gold-ribbon.png'),
('./boxes/white-red-ribbon.png'),
('./boxes/white-ribbon.png'),
('./boxes/white-w&g-angled.png'),
('./boxes/white-w&g-ribbon.png');
-- End TODO

-- INSERT INTO "box_ribbon" ("media_url")
-- VALUES ('https://m.media-amazon.com/images/I/81GcbpZPU5L.jpg'),
-- ('https://i5.walmartimages.com/seo/PMU-Pull-String-Bows-Gift-Wedding-Birthdays-Anniversaries-Ribbon-Flowers-Basket-Decoration-Large-Bow-Wrapping-5-Inch-20-Loops-Gold-Pkg-25_f6c34141-3c12-456a-98e8-0afeb2ce33ed.b8639a1a56c9df6e20754fa95fc2a344.jpeg'),
-- ('https://eagawards.com/cdn/shop/products/Silver-Shovel-Bow_2048x.png?v=1690481975');

-- TODO: Matt
-- INSERT INTO "occasions" ...

-- End TODO

