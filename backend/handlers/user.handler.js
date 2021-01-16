const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const {Op} = require('sequelize');

router.get('/', async function (req, res) {
  const id = req.query.id
  const uid = req.query.uid

  if (id) {
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  } else if (uid) {
    const user = await User.find({
      having: {
        uid: {
          [Op.eq]: uid,
        },
      },
    });
    return res.status(200).json(user);
  } else {
    const allUsers = await User.findAndCountAll();
    return res.status(200).json(allUsers);
  }
});

module.exports = router;
