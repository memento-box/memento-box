const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/messages', (req, res) => {
queryText = `
SELECT "memento_box"."recipient_name", "box_thanks"."message" FROM "memento_box" 
JOIN "box_thanks" ON "box_thanks"."box_id" = "memento_box"."id"
WHERE "box_thanks"."box_id" = 2 AND "box_thanks"."thanks_receiver_id" = 1;
`;
pool
    .query(queryText, [req.body.boxID, req.body.userID])
    .then((dbRes) => {res.status(200).send(dbRes.rows)})
    .catch((err) => {
      console.log('Fetching thanks messages failed:', err);
      res.sendStatus(500);
    });
});


router.post('/messages', (req, res) => {
    queryText = `
      INSERT INTO "box_thanks" ("message", "thanks_receiver_id", "box_id") VALUES ($1, $2, $3);
    `;
    pool
        .query(queryText, [req.body.message, req.body.thanksreceiverID, req.body.boxID])
        .then(() => {res.sendStatus(201)})
        .catch((err) => {
          console.log('Posting thanks messages failed:', err);
          res.sendStatus(500);
        });
});

router.get('/collaborators', (req, res) => {
  queryText = `
    SELECT "user"."first_name", "user"."last_name", "user"."id" FROM "user"
    JOIN "collaborator" ON "collaborator"."user_id" = "user"."id"
    WHERE "collaborator"."box_id" = $1 AND "collaborator"."accepted" = true;
  `;
  pool
      .query(queryText, [req.body.boxID])
      .then((dbRes) => {res.status(200).send(dbRes.rows)})
      .catch((err) => {
        console.log('Fetching collaborators failed:', err);
        res.sendStatus(500);
      });
  });

  router.get('/greeting', (req, res) => {
    queryText = `
      SELECT "memento_box"."collaborator_note" AS "greeting" FROM "memento_box"
      WHERE "memento_box"."id" = 1;
    `;
    pool
        .query(queryText, [req.body.boxID])
        .then((dbRes) => {res.status(200).send(dbRes.rows)})
        .catch((err) => {
          console.log('Fetching greeting failed:', err);
          res.sendStatus(500);
        });
    });

    router.get('/boxitems', (req, res) => {
      queryText = `
        SELECT "user"."first_name", "user"."last_name", "box_item"."media_url", "box_item"."description", "box_item"."title", "media_type"."type" FROM "box_item" 
        JOIN "media_type" ON "box_item"."media_type" = "media_type"."id" 
        JOIN "user" ON "user"."id" = "box_item"."user_id"
        WHERE "box_item"."box_id" = 2;
      `;
      pool
          .query(queryText, [req.body.boxID])
          .then((dbRes) => {res.status(200).send(dbRes.rows)})
          .catch((err) => {
            console.log('Fetching box items failed:', err);
            res.sendStatus(500);
          });
      });


module.exports = router;