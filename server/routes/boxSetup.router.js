const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST route for box setup information
router.post('/box-setup', (req, res) => {
  const {
    occasion,
    celebrating,
    startDate,
    collaborators,
    message,
  } = req.body;

  const queryText = `INSERT INTO "box_setup" 
    ("occasion", "celebrating", "start_date", "message")
    VALUES ($1, $2, $3, $4) RETURNING "id";`;

  pool.query(queryText, [occasion, celebrating, startDate, message])
    .then(result => {
      const newBoxId = result.rows[0].id;

      const collaboratorQueries = collaborators.map(collaborator => {
        const collaboratorQueryText = `INSERT INTO "collaborators" 
          ("box_id", "name", "email")
          VALUES ($1, $2, $3);`;

        return pool.query(collaboratorQueryText, [newBoxId, collaborator.name, collaborator.email]);
      });

      return Promise.all(collaboratorQueries);
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      console.error('Error in POST /box-setup:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
