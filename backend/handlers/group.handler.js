const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Group = require('../sequelize/models/group.model');
const GroupUsers = require('../sequelize/models/groupUsers.model');


router.get('/', async function (req, res) {
    const userId = req.query.userId
    const groups = await Group.findAll({
        include: [{
            model: User,
            as: 'Users',
            where: {
                Id : userId
            }
        }]
    })
    return res.status(200).json(groups);
});

module.exports = router;