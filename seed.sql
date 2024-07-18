-- This requires a user to exist

INSERT INTO "memento_box" ("box_color", "delivery_date", "collaborator_note", "user_id", "box_ribbon_id", "recipient_name", "recipient_email")
VALUES ('dark', '2024-08-19', 'Happy birthday, friend!', 1, 2, 'Jason', 'jason@email.com');

INSERT INTO "collaborator" ("box_id", "user_id", "email", "first_name", "last_name")
VALUES (1, 1, 'alex@smith.com', 'Alex', 'Smith'),
(1, 1, 'alex@martinez.com', 'Alex', 'Martinez'),
(1, 1, 'max@jones.com', 'Max', 'Jones'),
(1, 1, 'eliot@matthews.com', 'Eliot', 'Matthews');