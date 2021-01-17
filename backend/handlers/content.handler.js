const express = require('express');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const Service = require('../sequelize/models/service.model');
const {_attributes} = require('../sequelize/_index');
const router = express.Router();
const Genre = require('../sequelize/models/genre.model');
const ContentType = require('../sequelize/models/contentType.model');
const {Op} = require('sequelize');
const sequelize = require('../sequelize/_index');

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

router.get('/search', async function (req, res) {
  const {Op} = require('sequelize');
  const genres = req.query.genre;
  const type = req.query.type;
  const title = req.query.title;

  var allcontent = [];

  if (title && genres && type) {
    var array = genres.split(',');
    var lista = [];
    array.forEach(function (element) {
      lista.push({Value: element});
    });
    var typeId = 0;
    if (type == 'movie') {
      typeId = 1;
    } else {
      typeId = 2;
    }
    const content = await Content.findAll({
      where: {
        Title: title,
        ContentTypeId: typeId,
      },
      include: [
        {
          model: Genre,
          where: {
            [Op.or]: lista,
          },
        },
      ],
    });
    allcontent.push(content);
  } else if (title && genres) {
    var array = genres.split(',');
    var lista = [];
    array.forEach(function (element) {
      lista.push({Value: element});
    });
    const content = await Content.findAll({
      where: {
        Title: title,
      },
      include: [
        {
          model: Genre,
          where: {
            [Op.or]: lista,
          },
        },
      ],
    });
    allcontent.push(content);
  } else if (title && type) {
    var typeId = 0;
    if (type == 'movie') {
      typeId = 1;
    } else {
      typeId = 2;
    }
    const content = await Content.findAll({
      where: {
        Title: title,
        ContentTypeId: typeId,
      },
    });
    allcontent.push(content);
  } else if (type && genres) {
    var array = genres.split(',');
    var lista = [];
    array.forEach(function (element) {
      lista.push({Value: element});
    });
    var typeId = 0;
    if (type == 'movie') {
      typeId = 1;
    } else {
      typeId = 2;
    }
    const content = await Content.findAll({
      where: {
        ContentTypeId: typeId,
      },
      include: [
        {
          model: Genre,
          where: {
            [Op.or]: lista,
          },
        },
      ],
    });
    allcontent.push(content);
  } else if (title) {
    const contentTitle = await Content.findAll({
      where: {
        Title: title,
      },
    });
    allcontent.push(contentTitle);
  } else if (type) {
    var typeId = 0;
    if (type == 'movie') {
      typeId = 1;
    } else {
      typeId = 2;
    }
    const contentType = await Content.findAll({
      where: {
        ContentTypeId: typeId,
      },
    });
    allcontent.push(contentType);
  } else if (genres) {
    var array = genres.split(',');
    var lista = [];
    array.forEach(function (element) {
      lista.push({Value: element});
    });
    const contentGenre = await Content.findAll({
      include: [
        {
          model: Genre,
          where: {
            [Op.or]: lista,
          },
        },
      ],
    });
    allcontent.push(contentGenre);
  }

  return res.status(200).json(allcontent);
});

router.get('/watchlist', async function (req, res) {
  const uid = req.query.uid;
  const statusType = parseInt(req.query.StatusTypeId);
  if (uid) {
    const user = await User.findOne({
      where: {
        Uid: uid,
      },
    });

    if (user.Id) {
      /*const contents = await Content.findAll({
        include: [{
          model: User,
          as: 'Viewer',
          where: {
            Id: user.Id,
          }
        }]
      });
      const something = await contents.map(content => {
        if(content.dataValues.ContentStatus.StatusTypeId == statusType){
          return content.dataValues;
        }
      })*/
      const [contents, metadata] = await sequelize.query(
        'SELECT Contents.* from Users LEFT JOIN ContentStatus ON Users.Id = ContentStatus.UserId LEFT JOIN Contents ON ContentStatus.ContentId = Contents.Id WHERE ContentStatus.StatusTypeId = ' +
          statusType +
          ' AND Users.Id = ' +
          user.Id,
      );
      return res.status(200).json(contents);
    }
  }
});

router.get('/contentStatus', async function (req, res) {
  const uid = req.query.uid;
  const contentId = parseInt(req.query.ContentId);
  if (uid) {
    const user = await User.findOne({
      where: {
        Uid: uid,
      },
    });

    if (user.Id) {
      'SELECT ContentId from Contents WHERE ContententId = ' + contentId + ' AND ContentTypeId ';
      const [something, metadata] = await sequelize.query(
        'SELECT * from ContentStatus WHERE AND UserId = ' + user.Id + ' AND ContentId = ' + contentId,
      );
      return res.status(200).json(something);
    }
  }
});

module.exports = router;
