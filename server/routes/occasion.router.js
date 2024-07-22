const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for occasions
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "occasion";';

  pool.query(queryText)
    .then(result => res.json(result.rows))
    .catch(error => {
      console.error('Error in GET /api/occasion:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
