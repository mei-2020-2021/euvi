const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Recommendation = require('../sequelize/models/recommendation.model');
const Friendship = require('../sequelize/models/friendship.model');
const User = require('../sequelize/models/user.model');


router.get('/', async function (req, res) {
    const uid = req.query.uid;

    const user = await User.findOne({
        where: {
            Uid: uid
        }
    })
    const [recommendations, metadata] = await sequelize.query(
        'SELECT USERS.*, CONTENTS.* FROM USERS LEFT JOIN FRIENDSHIPS ON USERS.ID = FRIENDSHIPS.FRIENDID LEFT JOIN RECOMMENDATIONS ON FRIENDSHIPS.ID = RECOMMENDATIONS.FRIENDSHIPID LEFT JOIN CONTENTS ON RECOMMENDATIONS.CONTENTID = CONTENTS.ID WHERE FRIENDSHIPS.FRIENDID = ' + user.Id,
    );
    res.status(200).json(recommendations)
})

module.exports = router;