const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST route for box setup information
router.post('/', (req, res) => {
  const {
    occasionId,
    celebrating,
    startDate,
    message,
    collaborators,
  } = req.body;

  console.log('POST route', req.body);

  const queryText = `
    INSERT INTO "memento_box" 
    ("occasion_id", "recipient_name", "delivery_date", "collaborator_note", "created_at", "user_id")
    VALUES ($1, $2, $3, $4, CURRENT_DATE, $5) RETURNING "id";`;

  pool.query(queryText, [occasionId, celebrating, startDate, message, req.user.id])
    .then(result => {
      const newBoxId = result.rows[0].id;

      const collaboratorQueries = collaborators.map(collaborator => {
        const collaboratorQueryText = `
          INSERT INTO "collaborator" 
          ("box_id", "email", "first_name", "created_at")
          VALUES ($1, $2, $3, CURRENT_DATE);`;

        return pool.query(collaboratorQueryText, [newBoxId, collaborator.email, collaborator.firstName]);
      });

      return Promise.all(collaboratorQueries);
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.error('Error in POST /api/box-setup:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
