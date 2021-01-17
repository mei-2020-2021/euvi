const express = require('express');
const Content = require('../sequelize/models/content.model');
const ContentType = require('../sequelize/models/contentType.model');
const router = express.Router();
const sequelize = require('../sequelize/_index');
const axios = require('axios');
const Genre = require('../sequelize/models/genre.model');
const Service = require('../sequelize/models/service.model');
const {connect} = require('./user.handler');

router.post('/', async function (req, res) {
  //Content-Type
  const contentTypeMovie = await ContentType.create({
    Value: 'Movie',
  });
  const contentTypeSeries = await ContentType.create({
    Value: 'Series',
  });
  const contentTypeEpisode = await ContentType.create({
    Value: 'Episode',
  });
  //Services
  const serviceDisney = await Service.create({
    Value: 'Disney+',
    IconUrl: 'https://cdn6.aptoide.com/imgs/a/8/c/a8cbdef0355ad508eb90b6b6143a0fa1_icon.png',
  });
  const serviceNetflix = await Service.create({
    Value: 'Netflix',
    IconUrl:
      'https://cdn.vox-cdn.com/thumbor/AwKSiDyDnwy_qoVdLPyoRPUPo00=/39x0:3111x2048/1400x1400/filters:focal(39x0:3111x2048):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png',
  });

  //Genres
  const genreAnimation = await Genre.create({
    Value: 'Animation',
  });
  const genreAdventure = await Genre.create({
    Value: 'Adventure',
  });
  const genreComedy = await Genre.create({
    Value: 'Comedy',
  });
  const genreFamily = await Genre.create({
    Value: 'Family',
  });

  const contentSoul = await Content.create({
    Title: 'Soul',
    ReleaseYear: '2020',
    Sinopse:
      'A musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul learning about herself.s',
    ImageUrl:
      'https://i0.wp.com/roteirobaby.com.br/portal/wp-content/uploads/2020/05/Filme-Soul-2.jpg?resize=490%2C700&ssl=1',
    TrailerUrl: 'https://youtu.be/xOsLIiBStEs',
    ImdbRating: 8.1,
    ContentTypeId: 1,
  });

  contentSoul.addService(serviceDisney);
  contentSoul.addGenres([genreAnimation, genreAdventure, genreComedy]);

  const contentCoco = await Content.create({
    Title: 'Coco',
    ReleaseYear: '2017',
    Sinopse:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/Ga6RYejo6Hk',
    ImdbRating: 8.4,
    ContentTypeId: 1,
  });
  const contentLOTR = await Content.create({
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    ReleaseYear: '2001',
    Sinopse:
      'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY215_.jpg',
    TrailerUrl: 'https://youtu.be/V75dMMIW2B4',
    ImdbRating: 8.8,
    ContentTypeId: 1,
  });
  const contentGarfield = await Content.create({
    Title: 'Garfield',
    ReleaseYear: '2004',
    Sinopse:
      "Jon Arbuckle buys a second pet, a dog named Odie. However, Odie is then abducted and it is up to Jon's cat, Garfield, to find and rescue the canine.",
    ImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTIzMTc1OTUxOV5BMl5BanBnXkFtZTYwNTMxODc3._V1_.jpg',
    TrailerUrl: 'https://youtu.be/GV5y4yTDtBI',
    ImdbRating: 5.0,
    ContentTypeId: 1,
  });
  const contentCats = await Content.create({
    Title: 'Cats',
    ReleaseYear: '2019',
    Sinopse:
      'A tribe of cats called the Jellicles must decide yearly which one will ascend to the Heaviside Layer and come back to a new Jellicle life.',
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNjRlNTY3MTAtOTViMS00ZjE5LTkwZGItMGYwNGQwMjg2NTEwXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/gq50F-IDXDc',
    ImdbRating: 2.8,
    ContentTypeId: 1,
  });
  const contentNotebook = await Content.create({
    Title: 'The Notebook',
    ReleaseYear: '2004',
    Sinopse:
      'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
    ImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg',
    TrailerUrl: 'https://youtu.be/yDJIcYE32NU',
    ImdbRating: 7.8,
    ContentTypeId: 1,
  });
  const contentAvengers = await Content.create({
    Title: 'Avengers',
    ReleaseYear: '2012',
    Sinopse:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/udKE1ksKWDE',
    ImdbRating: 8.0,
    ContentTypeId: 1,
  });
  const contentHangover = await Content.create({
    Title: 'The Hangover',
    ReleaseYear: '2009',
    Sinopse:
      'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/tcdUhdOlz9M',
    ImdbRating: 8.0,
    ContentTypeId: 1,
  });
  const contentTCOTW = await Content.create({
    Title: 'The Call of the Wild',
    ReleaseYear: '2020',
    Sinopse: 'A sled dog struggles for survival in the wilds of the Yukon.',
    ImageUrl:
      'https://m.media-amazon.com/images/M/MV5BZDA1ZmQ2OGMtZDhkMC00ZjRkLWE3ZTMtMzA5ZTk0YjM1OGRmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/5P8R2zAhEwg',
    ImdbRating: 6.8,
    ContentTypeId: 1,
  });
  const contentConjuring = await Content.create({
    Title: 'The Conjuring',
    ReleaseYear: '2013',
    Sinopse:
      'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    ImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg',
    TrailerUrl: 'https://youtu.be/k10ETZ41q5o',
    ImdbRating: 7.5,
    ContentTypeId: 1,
  });

  res.status(200).send();
});

module.exports = router;
