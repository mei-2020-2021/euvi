const express = require('express');
const Content = require('../sequelize/models/content.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');

router.get('/', async function (req, res) {
  const id = req.query.id;

  if (id) {
    const content = await Content.findByPk(id);
    return res.status(200).json(content);
  } else {
    const allContent = await Content.findAll();
    return res.status(200).json(allContent);
  }
});

router.post('/', async function (req, res) {
  const content = await Content.create({
    Title: 'revenge of the mamas',
    ReleaseYear: '2021',
    Sinopse: 'Mamas Assasinas',
    ImageUrl:
      'https://i0.wp.com/roteirobaby.com.br/portal/wp-content/uploads/2020/05/Filme-Soul-2.jpg?resize=490%2C700&ssl=1',
    TrailerUrl: 'https://youtu.be/xOsLIiBStEs',
    ImdbRating: '9.1/10',
  });
  return res.status(200).json(content);
});

module.exports = router;
