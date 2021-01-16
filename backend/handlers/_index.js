const express = require('express');
const router = express.Router();

const usersHandler = require('./user.handler');
router.use('/users', usersHandler);

const contentHandler = require('./content.handler');
router.use('/content', contentHandler);

module.exports = router;
