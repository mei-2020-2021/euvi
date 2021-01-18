const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const {Op} = require('sequelize');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');
const { every } = require('../sequelize/models/_index');
const Genre = require('../sequelize/models/genre.model');

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

 router.get('/categories', async function (req, res){
    const userUid = req.query.uid;
    var countAnimation = 0
    var uIdList = []
    var genreList = []
    var animation=0
    var adventure=0
    var comedy=0
    var family=0
    var sports=0
    var drama=0
    var romance=0
    var scifi=0
    var history=0
    var thriller=0
    var mystery=0
    var action=0
    var crime=0
    var horror=0

    const user = await User.findOne({
        where:{
          Uid: userUid
        }
    });

    const allContent = await ContentStatus.findAll({
        where: {
            UserId: user.Id,
            StatusTypeId: 2
        },
    }).then((allContent)=>{
        for(var i=0;i<allContent.length;i++){
            uIdList.push(allContent[i].ContentId)
        }
    })
    for(var i = 0;i<uIdList.length;i++){
        await Genre.findAll({
             include:[{
                model: Content,
                where:{
                    Id: uIdList[i]
                }
            }],   
        }).then((genre)=>{
            for(var x=0;x<genre.length;x++){
                genreList.push(genre[x].Value)
            }
        })    
    }

    for(var i = 0;i<genreList.length;i++){
        if(genreList[i]=='Animation'){
            animation += 1
        } else if(genreList[i]=='Adventure'){
            adventure +=1
        } else if(genreList[i]=='Comedy'){
            comedy +=1
        } else if(genreList[i]=='Family'){
            family +=1
        } else if(genreList[i]=='Sports'){
            sports +=1
        } else if(genreList[i]=='Drama'){
            drama +=1
        } else if(genreList[i]=='Romance'){
            romance +=1
        } else if(genreList[i]=='SciFi'){
            scifi +=1
        } else if(genreList[i]=='History'){
            history +=1
        } else if(genreList[i]=='Thriller'){
            thriller +=1
        } else if(genreList[i]=='Mystery'){
            mystery +=1
        } else if(genreList[i]=='Action'){
            action +=1
        } else if(genreList[i]=='Crime'){
            crime +=1
        } else if(genreList[i]=='Horror'){
            horror +=1
        }
    }
    
    var allCategories = {Animation: animation, Comedy: comedy, Family: family, Sports: sports, Drama: drama, Romance: romance, Scifi:scifi, History: history, Thriller: thriller, Mystery: mystery, Action: action, Crime: crime, Horror: horror}
    return res.status(200).json(allCategories)
    

})

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
