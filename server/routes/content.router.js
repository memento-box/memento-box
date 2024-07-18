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
router.get("/voice", rejectUnauthenticated, (req, res) => {
  const boxId = req.body;

  const queryText = `
      SELECT "media_url" AS "secure_url", "public_id", "user_id"
      FROM "box_item"
      WHERE "box_id" = $1
      AND "media_type" = $2
      ORDER BY "id";
    `;
  const queryValues = {
    box_id: boxId,
    media_type: mediaType.voice,
  };

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
