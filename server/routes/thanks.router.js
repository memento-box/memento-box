const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/messages/:id', (req, res) => {
queryText = `SELECT "user"."first_name", "user"."last_name", "box_thanks"."message" FROM "user" 
JOIN "user_box_thanks" ON "user"."id" = "user_box_thanks"."user_id"
JOIN "box_thanks" ON "user_box_thanks"."box_thanks_id" = "box_thanks"."id"
WHERE "box_thanks"."box_id" = $1;`;
pool
    .query(queryText, [req.params.id])
    .then((dbRes) => {res.status(200).send(dbRes.rows)})
    .catch((err) => {
      console.log('Fetching thanks messages failed:', err);
      res.sendStatus(500);
    });
});


router.post('/messages', (req, res) => {
    
});

module.exports = router;