const express = require('express');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const Service = require('../sequelize/models/service.model');
const StatusType = require('../sequelize/models/statusType.model');
const {_attributes} = require('../sequelize/_index');
const router = express.Router();
const Genre = require('../sequelize/models/genre.model');
const ContentType = require('../sequelize/models/contentType.model');
const {Op} = require('sequelize');
const sequelize = require('../sequelize/_index');
const {connect} = require('./user.handler');

router.get('/addService', async function (req, res) {
  const userUid = req.query.uid;
  const serviceId = req.query.serviceId;

  const user = await User.findOne({
    where: {
      Uid: userUid,
    },
  });

  const service = await Service.findOne({
    where: {
      Id: serviceId,
    },
  });

  await user.addServices(service);
  return res.status(200).send();
});

router.get('/getNotUserService', async function (req, res) {
  const userUid = req.query.uid;

  const user = await User.findOne({
    where: {
      Uid: userUid,
    },
  });
  const [contents, metadata] = await sequelize.query(
    'SELECT Services.* FROM Services WHERE Services.ID NOT IN (SELECT Services.ID FROM Users LEFT JOIN UserService ON Users.Id = UserService.UserId LEFT JOIN Services ON UserService.ServiceId = Services.Id WHERE Users.Id = ' +
      user.Id +
      ')',
  );
  return res.status(200).json(contents);
});

module.exports = router;
