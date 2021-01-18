const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const Genre = require('../sequelize/models/genre.model');


router.get('/', async function (req, res){
  var allGenres = [];

  await Genre.findAll({
  }).then((all)=>{
    for(var i=0; i<all.length;i++){
      allGenres.push({Id: all[i].Id,Name: all[i].Value})
    }
  })
  return res.status(200).json(allGenres)
})



module.exports = router;