const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/messages', (req, res) => {
queryText = `
SELECT "user"."first_name", "user"."last_name", "box_thanks"."message" FROM "user" 
JOIN "memento_box" ON "user"."email" = "memento_box"."recipient_email"
JOIN "box_thanks" ON "box_thanks"."box_id" = "memento_box"."id"
WHERE "box_thanks"."box_id" = $1 AND "box_thanks"."recipient_id" = $2;
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
      INSERT INTO "box_thanks" ("message", "recipient_id", "box_id") VALUES ($1, $2, $3);
    `;
    pool
        .query(queryText, [req.body.message, req.body.recipientID, req.body.boxID])
        .then(() => {res.sendStatus(201)})
        .catch((err) => {
          console.log('Posting thanks messages failed:', err);
          res.sendStatus(500);
        });
});



module.exports = router;