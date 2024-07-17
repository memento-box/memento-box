const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const pool = require("../modules/pool");

/************************** MEDIA TYPE VARIABLES **************************/
const mediaType = {
  // Refers to table in database
  photo: 1,
  video: 2,
  photoLetter: 3,
  textLetter: 4,
  voice: 5,
};

/************************** GET VOICE **************************/
router.get("/voice/:id", rejectUnauthenticated, (req, res) => {
  const boxId = req.params.id;
  console.log("boxId", boxId);
  console.log("req.params.id:",req.params.id);

  const queryText = `
      SELECT "media_url" AS "secure_url", "u"."first_name" AS "first", "u"."last_name" AS "last"
      FROM "box_item" AS "b"
      JOIN "user" AS "u" ON "u"."id" = "b"."user_id"
      WHERE "box_id" = $1
      AND "media_type" = $2
      ORDER BY "b"."id";
    `;
    //-- "public_id", 
  const queryValues = [
    boxId,
    mediaType.voice,
  ];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      console.log("Error in GET Voice:", err);
      res.sendStatus(500);
    });
});

/************************** GET PHOTO **************************/

/************************** GET VIDEO **************************/

/************************** GET LETTER **************************/

module.exports = router;
