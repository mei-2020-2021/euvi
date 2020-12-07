const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');

router.get('/users', function (req, res) {

  const id = req.params['id'] | null;

  if (id) {
    const user = await User.findByPk(id);
    return res.status(200).json(user);
  }
});

module.exports = router;
