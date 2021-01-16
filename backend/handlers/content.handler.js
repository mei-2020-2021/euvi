const express = require('express');
const Content = require('../sequelize/models/content.model');
const router = express.Router();

router.get('/', async function (req, res) {
  const id = req.query.id;

  if (id) {
    const content = await Content.findByPk(id, {include: {all: true, nested: false}});
    return res.status(200).json(content);
  } else {
    const allContent = await Content.findAll({include: {all: true, nested: false}});
    return res.status(200).json(allContent);
  }
});

module.exports = router;
