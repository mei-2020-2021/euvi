const express = require('express');
const User = require('../sequelize/models/user.model');
const Content = require('../sequelize/models/content.model');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const SeriesEpisode = require('../sequelize/models/seriesEpisode.model');
const Service = require('../sequelize/models/service.model');
const StatusType = require('../sequelize/models/statusType.model')
const {_attributes} = require('../sequelize/_index');
const router = express.Router();
const Genre = require('../sequelize/models/genre.model');
const ContentType = require('../sequelize/models/contentType.model');
const {Op} = require('sequelize');
const sequelize = require('../sequelize/_index');
const {connect} = require('./user.handler');

router.get('/', async function (req, res) {
  const id = req.query.id;

  if (id) {
    const content = await Content.findByPk(id, {include: {all: true, nested: false}});
    return res.status(200).json(content);
  } else {
    const allContent = await Content.findAll({
      include: {
        all: true,
        nested: false,
      },
      where: {
        ContentTypeId: {
          [Op.ne]: 3,
        },
      },
    });
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
  const statusTypeId = parseInt(req.query.statusTypeId);
  if (uid) {
    const user = await User.findOne({
      where: {
        Uid: uid,
      },
    });
    if (user.Id) {
      const [contents, metadata] = await sequelize.query(
        'SELECT Contents.* from Users LEFT JOIN ContentStatus ON Users.Id = ContentStatus.UserId LEFT JOIN Contents ON ContentStatus.ContentId = Contents.Id WHERE ContentTypeId != 3 AND ContentStatus.StatusTypeId = ' +
          statusTypeId +
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
      const [something, metadata] = await sequelize.query(
        'SELECT StatusTypes.Value from Users LEFT JOIN ContentStatus ON Users.Id = ContentStatus.UserId LEFT JOIN Contents ON ContentStatus.ContentId = Contents.Id LEFT JOIN StatusTypes ON StatusTypes.Id = ContentStatus.StatusTypeId WHERE Contents.Id =' +
          contentId +
          ' AND Users.Id = ' +
          user.Id,
      );
      return res.status(200).json(something);
    }
  }
});

router.post('/createStatus', async function (req, res) {
  const statusId = parseInt(req.query.statusTypeId);
  const userUID = req.query.uid
  const contentId = req.query.contentId
  var epIdList = [];
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  const statusType = await StatusType.findOne({
    where:{
      Id: statusId
    }
  });

  const user = await User.findOne({
    where:{
      Uid: userUID
    }
  });

  await Content.findOne({
    where:{
      Id: contentId
    }
  }).then(async (content) => {

    if(content.ContentTypeId == 1){
      await user.addWatchlistContent(content,{through:{StatusTypeId: statusId, WatchedAt: dateTime}});
      const contentStatus= await ContentStatus.update({StatusTypeId: statusId},{
        where: {
          ContentId: contentId,
          UserId: user.Id,
        }
      });

    } else if(content.ContentTypeId == 2){
      const allEpisodes = await SeriesEpisode.findAll({
        where:{
          SeriesId: contentId
        }
      })

      for (var i = 0; i<allEpisodes.length;i++){
        epIdList.push(allEpisodes[i].EpisodeId)
      }
      console.log(epIdList.length)
      for (var i=0; i<epIdList.length;i++){
        await Content.findOne({
          where:{
            Id: epIdList[i]
          }
        }).then(async function (episodes){
          await user.addWatchlistContent(content,{through:{StatusTypeId: statusId, WatchedAt: dateTime}});
          await user.addWatchlistContent(episodes,{through:{StatusTypeId: statusId, WatchedAt: dateTime}});
        })
        const contentStatus= await ContentStatus.update({StatusTypeId: statusId},{
          where: {
            ContentId: epIdList[i],
            UserId: user.Id,
          }
        });
        
      }
    }
    
  })
  return res.status(200).json(contentId)
});


router.get('/feedback', async function (req, res) {
  const userUid = req.query.uid;
  const contentId = req.query.contentId

  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });
  const contentFeedback= await ContentStatus.findOne({
    where: {
      ContentId: contentId,
      UserId: user.Id,
    },
    attributes: ['Feedback']
  });
  if(contentFeedback) {
    return res.status(200).json(contentFeedback.Feedback)
  }  else {
    return res.status(200).json(null)
  }
});

router.post('/feedback', async function (req, res) {
  const userUid = req.query.uid;
  const contentId = req.query.contentId
  const feedback = req.query.feedback

  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });
  const contentFeedback= await ContentStatus.update({ Feedback: feedback }, {
    where: {
      ContentId: contentId,
      UserId: user.Id,
    }
  });
  return res.status(200).json(contentFeedback)
});


router.post('/updateStatusType', async function (req, res) {
  const userUid = req.query.uid
  const contentId = req.query.contentId
  const contentStatusTypeId = req.query.StatusTypeId
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });

  const content = await Content.findOne({
    where:{
      Id: contentId
    }
  });
  

  if(contentStatusTypeId == 2){
    const contentStatus= await ContentStatus.update({WatchedAt: dateTime},{
      where: {
        ContentId: contentId,
        UserId: user.Id,
      }
    });
    const contentStatus1= await ContentStatus.update({StatusTypeId: contentStatusTypeId},{
      where: {
        ContentId: contentId,
        UserId: user.Id,
      }
    });
    return res.status(200).json(contentStatus)

  } else {
    const contentStatus= await ContentStatus.update({StatusTypeId: contentStatusTypeId},{
      where: {
        ContentId: contentId,
        UserId: user.Id,
      }
    });
    return res.status(200).json(contentStatus)
  }
});


router.get('/watchedAt', async function (req, res) {
  const userUid = req.query.uid;
  const contentId = req.query.contentId

  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });

  const content = await Content.findOne({
    where:{
      Id: contentId
    }
  });

  const contentWatchedAt= await ContentStatus.findOne({
    where: {
      ContentId: contentId,
      UserId: user.Id,
    },
  });
  return res.status(200).json(contentWatchedAt.WatchedAt)
});

router.get('/getStatusType', async function (req, res) {
  const userUid = req.query.uid;
  const contentId = req.query.contentId

  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });

  const content = await Content.findOne({
    where:{
      Id: contentId
    }
  });

  const contentWatchedAt= await ContentStatus.findOne({
    where: {
      ContentId: contentId,
      UserId: user.Id,
    },
  });
  return res.status(200).json(contentWatchedAt.StatusTypeId)
});


router.get('/trendingNow', async function (req, res) {
  const uid = req.query.uid;

  const allContent = await Content.findAll({
    include: {
      all: true,
      nested: false,
    },
    where: {
      ContentTypeId: {
        [Op.ne]: 3,
      },
    },
  });
  return res.status(200).json(allContent);
});

router.get('/topMovies', async function (req, res) {
  const uid = req.query.uid;

  const allContent = await Content.findAll({
    include: {
      all: true,
      nested: false,
    },
    where: {
      ContentTypeId: {
        [Op.eq]: 1,
      },
    },
  });
  return res.status(200).json(allContent);
});

router.get('/topSeries', async function (req, res) {
  const uid = req.query.uid;

  const allContent = await Content.findAll({
    include: {
      all: true,
      nested: false,
    },
    where: {
      ContentTypeId: {
        [Op.eq]: 2,
      },
    },
  });
  return res.status(200).json(allContent);
});

router.get('/getSeriesInfo', async function (req, res) {
  const serieId = req.query.serieId;
  var list = []
  var allInfo = []
  const duration = await Content.findOne({
    where:{
      Id: serieId
    },
    attributes: ['Duration']
  })

  const allContent = await SeriesEpisode.findAll({
    where: {
      SeriesId: serieId
    },
    attributes: ['SeasonNumber', 'EpisodeNumber']
  });
  list.push(duration)
  list.push(allContent)
  var seasons ={Seasons: list[1][list[1].length-1].SeasonNumber}
  allInfo.push(list[0])
  allInfo.push(seasons)
  return res.status(200).json(allInfo);
});

router.get('/progress', async function (req, res){
  const userUid = req.query.uid;
  const contentId = req.query.contentId
  var list = []
  var count = 0
  var percentage = 0
  const allEps = await SeriesEpisode.findAll({
    where: {
      SeriesId: contentId
    }
  })
  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });
  
  for (var i = 0; i<allEps.length;i++){
    list.push(allEps[i].EpisodeId)
  }
  
  for (var i = 0; i<list.length;i++){
    console.log(list[i])
    console.log(user.Id)
    await ContentStatus.findOne({
      where: {
        ContentId: list[i],
        UserId: user.Id
      }
    }).then((allEpsStatus)=>{
      if(allEpsStatus.StatusTypeId == 2){
        count++;
      }
    })
  }
  percentage = (count*100)/list.length

  console.log(list)
  return res.status(200).json(percentage);
})

router.get('/currentSeasonEpisodes', async function (req, res){
  const userUid = req.query.uid;
  const contentId = req.query.contentId;
  var list = []
  var greatestEp = 0
  var final = {}

  const allEps = await SeriesEpisode.findAll({
    where: {
      SeriesId: contentId
    }
  })
  const user = await User.findOne({
    where:{
      Uid: userUid
    }
  });
  
  for (var i = 0; i<allEps.length;i++){
    list.push(allEps[i].EpisodeId)
  }

  for (var i = 0; i<list.length;i++){
    await ContentStatus.findOne({
      where: {
        ContentId: list[i],
        UserId: user.Id
      }
    }).then((allEpsStatus)=>{
      if(allEpsStatus.StatusTypeId == 2 && allEpsStatus.ContentId > greatestEp){
        greatestEp = allEpsStatus.ContentId;
      }
    })
  }
  await SeriesEpisode.findAll({
    where: {
      EpisodeId: greatestEp
    },
    attributes: ['SeasonNumber']
  }).then((allEpsSeason)=>{
    final = {Episode: greatestEp, Season: allEpsSeason[0].SeasonNumber}
  })
  
  return res.status(200).json(final)
})

module.exports = router;
