const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Group = require('../sequelize/models/group.model');
const GroupUsers = require('../sequelize/models/groupUsers.model');


router.get('/', async function (req, res) {
    const userUID = req.query.uid
    const groups = await Group.findAll({
        include: [{
            model: User,
            as: 'Users',
            where: {
                Uid : userUID
            }
        }]
    })
    return res.status(200).json(groups);
});


router.post('/group', async function (req, res) {
    const groupName = req.query.name;
    const ownerUID = req.query.ownerUid;
    const allUsersUID = req.query.usersUid
    var array = allUsersUID.split(',');
    const user = await User.findOne({
        where:{
          Uid: ownerUID
        }
      });
    const contentGroup1 = await Group.create({
        Name: groupName,
        OwnerId: user.Id
      });
    array.forEach(async function(element){
        const getAllUsers = await User.findOne({
            where:{
                Uid: element
              } 
        })
        await contentGroup1.addUser(getAllUsers);
    })
        
});

module.exports = router;