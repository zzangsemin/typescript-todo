const express = require('express');
const router = express.Router();

const controller = require('../controllers');

router.use('/todo', controller);

module.exports = router;
