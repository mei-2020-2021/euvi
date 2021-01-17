const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Service = require('../sequelize/models/service.model');

router.get('/', async function (req, res) {
  const id = req.query.id;
  const uid = req.query.uid;

  if (id) {
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  } else if (uid) {
    const user = await User.findOne({
      include: Service,
      where: {
        Uid: uid,
      },
    });
    return res.status(200).json(user);
  } else {
    const allUsers = await User.findAndCountAll();
    return res.status(200).json(allUsers);
  }
});


router.get('/friends', async function (req, res) {
  const uid = req.query.uid;
  const user = await User.findOne({
    include: Service,
    where: {
      Uid: uid,
    },
  });

  const [notfriends, metadata] = await sequelize.query(
    'SELECT * FROM USERS WHERE USERS.ID NOT IN (SELECT FRIENDSHIPS.USERID FROM FRIENDSHIPS WHERE FRIENDSHIPS.FRIENDID='+ user.Id +') AND USERS.ID<>'+user.Id
);
  return res.status(200).json(notfriends);
});

module.exports = router;
