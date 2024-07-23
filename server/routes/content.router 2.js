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
/************************** GET ITEM COUNTS **************************/
router.get("/count/:id", rejectUnauthenticated, (req, res) => {
  const boxId = req.params.id;
  console.log('In Get Count');
  const queryText = `
SELECT jsonb_build_object(
    'photo', COALESCE(photo_count, 0),
    'video', COALESCE(video_count, 0),
    'voice', COALESCE(voice_count, 0),
    'letter', COALESCE(letter_count, 0)
) AS result
FROM (
    SELECT 
        SUM(CASE WHEN mt."type" = 'photo' THEN 1 ELSE 0 END) AS photo_count,
        SUM(CASE WHEN mt."type" = 'video' THEN 1 ELSE 0 END) AS video_count,
        SUM(CASE WHEN mt."type" = 'voice' THEN 1 ELSE 0 END) AS voice_count,
        SUM(CASE WHEN mt."type" IN ('photoLetter', 'textLetter') THEN 1 ELSE 0 END) AS letter_count
    FROM "box_item" bi
    JOIN "media_type" mt ON bi."media_type" = mt.id
    WHERE bi."box_id" = $1
) counts;
  `;
  console.log(queryText);
  pool.query(queryText, [boxId])
    .then((result) => {
      console.log(result.rows);
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      console.log('Error in get count:', err);
      res.sendStatus(500);
    }) 

});

/************************** GET VOICE **************************/
router.get("/voice/:id", rejectUnauthenticated, (req, res) => {
  const boxId = req.params.id;
  // console.log("boxId", boxId);
  // console.log("req.params.id:",req.params.id);

  const queryText = `
      SELECT "media_url" AS "secure_url", "u"."first_name" AS "first", "u"."last_name" AS "last"
      FROM "box_item" AS "b"
      JOIN "user" AS "u" ON "u"."id" = "b"."user_id"
      WHERE "box_id" = $1
      AND "media_type" = $2
      ORDER BY "b"."id";
    `;
  //-- "public_id",
  const queryValues = [boxId, mediaType.voice];

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

/************************** DELETE VOICE **************************/
router.delete("/voice/:id", rejectUnauthenticated, async (req, res) => {
  const user = req.user.id;
  const item = req.params.id;

  try {
    const boxItemResponse = await pool.query(
      `
      SELECT "user_id", "box_id"
      FROM "box_item"
      WHERE "id" = $1;
    `,
      [item]
    );

    const { user_id: itemOwner, box_id } = boxItemResponse.rows[0];

    const mementoBoxResponse = await pool.query(
      `
      SELECT "user_id"
      FROM "memento_box"
      WHERE "box_id" = $1;
    `,
      [box_id]
    );

    const isAdmin = mementoBoxResponse.rows.some((row) => row.user_id === user);

    if (user !== itemOwner && !isAdmin) {
      return res.status(403).json({
        message:
          "You cannot delete another user's content without admin status",
      });
    }

    await pool.query(
      `
      DELETE FROM "box_item"
      WHERE "id" = $1;
    `,
      [item]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting voice note:", err);
    res.sendStatus(500);
  }
});

/************************** GET PHOTO **************************/

/************************** GET VIDEO **************************/

/************************** GET LETTER **************************/

module.exports = router;
