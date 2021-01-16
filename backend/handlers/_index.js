const express = require('express');
const router = express.Router();

const usersHandler = require('./user.handler');
router.use('/users', usersHandler);

const contentHandler = require('./content.handler');
router.use('/content', contentHandler);

const initHandler = require('./init.handler');
router.use('/init', initHandler);

module.exports = router;
