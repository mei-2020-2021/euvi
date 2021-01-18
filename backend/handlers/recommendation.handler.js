const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Recommendation = require('../sequelize/models/recommendation.model');
const Friendship = require('../sequelize/models/friendship.model');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');


router.get('/', async function (req, res) {
    const uid = req.query.uid;

    const user = await User.findOne({
        where: {
            Uid: uid
        }
    })
    const [recommendations, metadata] = await sequelize.query(
        'SELECT USERS.*, CONTENTS.* FROM RECOMMENDATIONS LEFT JOIN FRIENDSHIPS ON FRIENDSHIPS.ID = RECOMMENDATIONS.FRIENDSHIPID LEFT JOIN USERS ON USERS.ID = FRIENDSHIPS.USERID LEFT JOIN CONTENTS ON RECOMMENDATIONS.CONTENTID = CONTENTS.ID WHERE FRIENDSHIPS.FRIENDID = ' + user.Id,
    );
    res.status(200).json(recommendations)
})

router.post('/removeRecommendation', async function (req, res){
    const userUid = req.query.uid;
    const friendUid = req.query.friendUid;
    const contentId = req.query.contentId;

    const user = await User.findOne({
        where:{
            Uid: userUid
        }
    })

    const friend = await User.findOne({
        where:{
            Uid: friendUid
        }
    })

    const content = await Content.findOne({
        where:{
            Id: contentId
        }
    })

    const friendshipUser = await Friendship.findOne({
        where: {
          UserId: friend.Id,
          FriendId: user.Id,
        },
    });
    res.status(200).json(await friendshipUser.removeContentRecommendation(content))
})

module.exports = router;