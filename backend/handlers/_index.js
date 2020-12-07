const express = require('express');
const router = express.Router();
const usersHandler = require('./user.handler');
router.get('/users', usersHandler);

module.exports = router;
