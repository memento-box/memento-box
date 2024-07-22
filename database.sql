CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "first_name" VARCHAR(25),
    "last_name" VARCHAR(25),
    "birthday" DATE,
    "password" VARCHAR(1000),
    "created_at" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "box_ribbon" (
    "id" SERIAL PRIMARY KEY,
    "media_url" VARCHAR(2048)
);

CREATE TABLE "occasion" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200)
);

CREATE TABLE "memento_box" (
    "id" SERIAL PRIMARY KEY,
    "delivery_date" DATE,
    "collaborator_note" VARCHAR(1000),
    "user_id" INTEGER REFERENCES "user",
    "created_at" DATE DEFAULT CURRENT_DATE,
    "box_ribbon_id" INTEGER REFERENCES "box_ribbon",
    "recipient_name" VARCHAR(100),
    "recipient_email" VARCHAR(100),
    "occasion_id" INTEGER REFERENCES "occasion",
    "unique_id" VARCHAR(1000)
);

CREATE TABLE "media_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(200)
);

INSERT INTO "media_type" ("type") VALUES 
    ('photo'),
    ('video'),
    ('photoLetter'),
    ('textLetter'),
    ('voice');

CREATE TABLE "collaborator" (
    "id" SERIAL PRIMARY KEY,
    "box_id" INTEGER REFERENCES "memento_box",
    "user_id" INTEGER REFERENCES "user",
    "invitation_code" VARCHAR(1028),
    "email" VARCHAR(400),
    "accepted" BOOLEAN,
    "first_name" VARCHAR(25),
    "last_name" VARCHAR(25),
    "created_at" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "box_item" (
    "id" SERIAL PRIMARY KEY,
    "box_id" INTEGER REFERENCES "memento_box",
    "user_id" INTEGER REFERENCES "user",
    "media_url" VARCHAR(2048),
    "description" VARCHAR(1000),
    "media_type" INTEGER REFERENCES "media_type",
    "created_at" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "box_thanks" (
    "id" SERIAL PRIMARY KEY,
    "message" VARCHAR(1000),
    "box_id" INTEGER REFERENCES "memento_box",
    "created_at" DATE DEFAULT CURRENT_DATE
);

CREATE TABLE "user_box_thanks" (
    "id" SERIAL PRIMARY KEY,
    "box_thanks_id" INTEGER REFERENCES "box_thanks",
    "user_id" INTEGER REFERENCES "user"
);

-- Sample data for box_ribbon
INSERT INTO "box_ribbon" ("media_url") VALUES 
    ('./boxes/black-blue-ribbon.png'),
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

-- Sample data for occasion
INSERT INTO "occasion" ("name") VALUES 
    ('Birthday'),
    ('Wedding'),
    ('Anniversary'),
    ('Graduation'),
    ('Get Well Soon'),
    ('Thank You'),
    ('Retirement'),
    ('In Memory Of'),
    ('New Baby');