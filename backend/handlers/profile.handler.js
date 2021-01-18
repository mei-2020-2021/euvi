const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const {Op} = require('sequelize');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const { every } = require('../sequelize/models/_index');

router.get('/', async function (req, res) {
 const userId = req.query.UserId;
 const statusType = req.query.StatusTypeId;
 if(userId){
     const contentIds = await ContentStatus.findAll({
         where: {
            UserId: userId,
            StatusTypeId: statusType
         },
         attributes: ['ContentId']
     })
     return res.status(200).json(contentIds);
 }
});

/* router.get('/categories', async function (req, res){
    const userUid = req.query.uid;

    const user = await User.findOne({
        where:{
          Uid: userUid
        }
    });

    const allContent = await ContentStatus.findAll({
        where: {
            UserId: user.Id
        }
    })

}) */

module.exports = router;
