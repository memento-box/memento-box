const express = require('express');
const router = express.Router();
const { saveBoxSetup } = require('../controllers/boxSetupController');

router.post('/', saveBoxSetup);

module.exports = router;
