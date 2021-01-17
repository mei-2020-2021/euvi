const express = require('express');
const User = require('../sequelize/models/user.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const { Op } = require('sequelize');
const Group = require('../sequelize/models/group.model');
const GroupUsers = require('../sequelize/models/groupUsers.model');


router.get('/', async function (req, res) {
    const userId = req.query.userId
    const groups = await Group.findAll({
        include: [{
            model: User,
            as: 'Users',
            where: {
                Id : userId
            },
            nested: true
        }],
        attributes: ['Name', 'OwnerId']
    })
    return res.status(200).json(groups);
});


router.post('/group', async function (req, res) {
    const groupName = req.query.name;
    const ownerId = req.query.ownerId;
    const allUsersId = req.query.users
    var array = allUsersId.split(',');

    const contentGroup1 = await Group.create({
        Name: groupName,
        OwnerId: ownerId
      });
    array.forEach(async function(element){
        const getAllUsers = await User.findOne({
            where:{
                Id: element
              } 
        })
        await contentGroup1.addUser(getAllUsers);
    })
        
});

module.exports = router;