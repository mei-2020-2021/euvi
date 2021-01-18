const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const {Op} = require('sequelize');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');
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
    var count = 0
    var list = []
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
    for (i=0; i<allContent.length;i++){
        if(allContent[i].StatusTypeId == 2){
            list.push(allContent[i].ContentId)
        }
    }

}) */

router.get('/totalTime', async function (req,res){
    const userUid = req.query.uid;
    var idList = []
    var timeWatched = 0
    const user = await User.findOne({
        where:{
          Uid: userUid
        }
    });

    const allIds = await ContentStatus.findAll({
        where: {
            UserId: user.Id
        }
    })

    for(i=0; i<allIds.length;i++){
        const allContent = await Content.findOne({
            where:{
                Id: allIds[i].ContentId
            }
        })
        timeWatched += allContent.Duration
    }
    return res.status(200).json(timeWatched)

})


module.exports = router;
