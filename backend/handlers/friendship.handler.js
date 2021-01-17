const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Friendship = require('../sequelize/models/friendship.model');

router.get('/', async function (req, res) {
  const id = req.query.id

  const friendships = await Friendship.findAll({
    where: {
      FriendId: id,
    }
  })
  const friendsIds = friendships.map(friendship => {return({Id: friendship.dataValues.UserId})})
  const friendsList = await User.findAll(
    {
      where: {
        [Op.or]: friendsIds
      }
    }
  )
  return res.status(200).json(friendsList);
});

module.exports = router;