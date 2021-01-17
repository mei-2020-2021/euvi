const express = require('express');
const router = express.Router();

const usersHandler = require('./user.handler');
router.use('/users', usersHandler);

const contentHandler = require('./content.handler');
router.use('/content', contentHandler);

const initHandler = require('./init.handler');
router.use('/init', initHandler);

const friendshipHandler = require('./friendship.handler');
router.use('/friendship', friendshipHandler);

const groupHandler = require('./group.handler');
router.use('/group', groupHandler);
module.exports = router;
