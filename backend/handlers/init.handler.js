const express = require('express');
const Content = require('../sequelize/models/content.model');
const ContentType = require('../sequelize/models/contentType.model');
const StatusType = require('../sequelize/models/statusType.model');
const router = express.Router();
const Genre = require('../sequelize/models/genre.model');
const User = require('../sequelize/models/user.model');
const Group = require('../sequelize/models/group.model');
const Service = require('../sequelize/models/service.model');
const ContentStatus = require('../sequelize/models/contentStatus.model');
const Friendship = require('../sequelize/models/friendship.model');

const init = async () => {
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

  //StatusType
  const statusWatching = await StatusType.create({
    Value: 'Watching',
  });
  const statusWatched = await StatusType.create({
    Value: 'Watched',
  });
  const statusToWatch = await StatusType.create({
    Value: 'To Watch',
  });

  //Create user
  const contentUserRato = await User.create({
    Uid: 'nZGFSKipAjUtyDoT2cAKXe4ykMt2',
    FirstName: 'Ricardo',
    LastName: 'Faria',
    BirthDate: '07/09/1999',
    Email: 'bmcdcar@hotmail.com',
  });
  const contentUserMartins = await User.create({
    Uid: 'Bdsp4LQi9HVo9wBAFRckbNdAn1H3',
    FirstName: 'Miguel',
    LastName: 'Martins',
    BirthDate: 2 / 4 / 1999,
    Email: 'miguelmartins737@gmail.com',
  });
  const contentUserRicardo = await User.create({
    Uid: 'qaD2O1tRQtPlOSrS4wc6PvBUI9F2',
    FirstName: 'Ricardo',
    LastName: 'Faria',
    BirthDate: 7 / 9 / 1999,
    Email: 'ricardoafonfaria@gmail.com',
  });
  const contentUserPereira = await User.create({
    Uid: 'Nc94sEHEhBP2769dzPPOXQ7blQE3',
    FirstName: 'Miguel',
    LastName: 'Pereira',
    BirthDate: 8 / 9 / 1999,
    Email: 'massf@iscte-iul.pt',
  });
  const contentUser5 = await User.create({
    Uid: 5,
    FirstName: 'André',
    LastName: 'Ribeiro',
    BirthDate: 1 / 2 / 1998,
    Email: 'andre.ribeiro@hotmail.com',
  });
  const contentUser6 = await User.create({
    Uid: 6,
    FirstName: 'Alexandre',
    LastName: 'Monteiro',
    BirthDate: 1 / 2 / 1998,
    Email: 'alexandre.monteiro@hotmail.com',
  });
  const contentUser7 = await User.create({
    Uid: 7,
    FirstName: 'Francisco',
    LastName: 'Cavaco',
    BirthDate: 1 / 2 / 1998,
    Email: 'francisco.cavaco@hotmail.com',
  });
  const contentUser8 = await User.create({
    Uid: 8,
    FirstName: 'Alicia',
    LastName: 'Cabral',
    BirthDate: 1 / 2 / 1998,
    Email: 'alicia.cabral@hotmail.com',
  });
  const contentUser9 = await User.create({
    Uid: 9,
    FirstName: 'Ines',
    LastName: 'Sa',
    BirthDate: 1 / 2 / 1998,
    Email: 'ines.sa@hotmail.com',
  });
  const contentUser10 = await User.create({
    Uid: 10,
    FirstName: 'Leonor',
    LastName: 'Cordeiro',
    BirthDate: 1 / 2 / 1998,
    Email: 'leonor.cordeiro@hotmail.com',
  });
  const contentUser11 = await User.create({
    Uid: 11,
    FirstName: 'Madalena',
    LastName: 'Gonçalves',
    BirthDate: 1 / 2 / 1998,
    Email: 'madalena.goncalves@hotmail.com',
  });
  const contentUser12 = await User.create({
    Uid: 12,
    FirstName: 'Anita',
    LastName: 'Peres',
    BirthDate: 1 / 2 / 1998,
    Email: 'anita.peres@hotmail.com',
  });
  const contentUser13 = await User.create({
    Uid: 13,
    FirstName: 'David',
    LastName: 'Silva',
    BirthDate: 1 / 2 / 1998,
    Email: 'david.silva@hotmail.com',
  });

  //Create Group
  const contentGroup1 = await Group.create({
    Name: 'Group A',
    OwnerId: 5,
  });
  const contentGroup2 = await Group.create({
    Name: 'Group B',
    OwnerId: 1,
  });

  // ------------------------------------ Movie Content -------------------------------------------------------//
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

  // Soul Movie
  await contentUserRato.addWatchlistContent(contentSoul, {through: {Feedback: -1}});
  const contentStatusSoulUser1 = await ContentStatus.findOne({
    where: {
      ContentId: contentSoul.Id,
      UserId: contentUserRato.Id,
    },
  });
  await statusWatching.setContentStatus(contentStatusSoulUser1);
  await contentSoul.addGenres([genreAnimation, genreAdventure, genreComedy]);
  await contentSoul.addServices([serviceDisney]);

  // Coco Movie
  await contentCoco.addGenres([genreAdventure, genreComedy]);

  // Garfield Movie
  await contentGarfield.addGenres([genreComedy]);

  // ------------------------------------ Shows Content -------------------------------------------------------//
  // ------------Stranger Things----------- //
  const contentLupin = await Content.create({
      Title: 'Lupin',
      ReleaseYear: '2021 - Current',
      Sinopse:
        'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.',
      ImageUrl:
        'https://m.media-amazon.com/images/M/MV5BNzRlNGUzMmEtYTg0Ni00N2U2LTg4YWEtNDdlNmMwYjBlZDQ0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UY216_.jpg',
      TrailerUrl: 'https://youtu.be/ga0iTWXCGa0',
      ImdbRating: 7.8,
      Duration: 231,
      ContentTypeId: 2,
    });
  // Episodes
  const contentLupinS1E1 = await Content.create({
    Title:'Chapter 1',
    ReleaseYear: '2021',
    Sinopse: 'Years after a tragic injustice involving his father, Assane seeks to settle a score, and a debt, by stealing a diamond necklace. However, the heist takes an unexpected turn.', 
    ContentTypeId: 3,
    Duration: 47
  })
  const contentLupinS1E2 = await Content.create({
    Title:'Chapter 2',
    ReleaseYear: '2021',
    Sinopse: "Assane hatches a plot to contact Comet, an inmate who steers him to a clue about Babakar's demise. Anne Pellegrini comes clean about her past.", 
    ContentTypeId: 3,
    Duration: 52
  })
  const contentLupinS1E3 = await Content.create({
    Title:'Chapter 3',
    ReleaseYear: '2021',
    Sinopse: "Assane confronts commissioner Dumont, and plants a decoy to divert the police. Hubert Pellegrini's connection to Babakar's fate is revealed.", 
    ContentTypeId: 3,
    Duration: 42
  })
  const contentLupinS1E4 = await Content.create({
    Title:'Chapter 4',
    ReleaseYear: '2021',
    Sinopse: 'Assane enlists the help of Journalist Fabienne Beriot to retrieve incriminating evidence on Hubert Pellegrini. Officer Guedira connects the dots around the Louvre heist.', 
    ContentTypeId: 3,
    Duration: 47
  })
  const contentLupinS1E5 = await Content.create({
    Title:'Chapter 5',
    ReleaseYear: '2021',
    Sinopse: 'While on his way to Etretat with Claire and Raoul, Assane encounters and unwelcome figure. In a bind, Assane sends a message to Captain Laugier.', 
    ContentTypeId: 3,
    Duration: 43
  })

  // ------------Queens Gambit----------- //
  const contentQueensGambit = await Content.create({
    Title: "Queen's Gambit",
    ReleaseYear: '2020',
    Sinopse:
      'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    ImageUrl:
      'https://upload.wikimedia.org/wikipedia/en/d/d3/The_Queen%27s_Gambit.jpg',
    TrailerUrl: 'https://youtu.be/CDrieqwSdgI',
    ImdbRating: 8.6,
    Duration: 395,
    ContentTypeId: 2,

  });
// Episodes
const contentQueensGambitS1E1 = await Content.create({
  Title:'Openings',
  ReleaseYear: '2020',
  Sinopse: 'Sent to an orphanage at age 9, Beth develops an uncanny knack for chess and a growing dependence on the green tranquilizers given to the children.', 
  ContentTypeId: 3,
  Duration: 59
})

const contentQueensGambitS1E2 = await Content.create({
  Title:'Exchanges',
  ReleaseYear: '2020',
  Sinopse: 'Suddenly plunged into a confusing new life in suburbia, teenage Beth studies her high school classmates and hatches a plan to enter a chess tournament.', 
  ContentTypeId: 3,
  Duration: 65
})

const contentQueensGambitS1E3 = await Content.create({
  Title:'Doubled Pawns',
  ReleaseYear: '2020',
  Sinopse: 'The trip to Cincinnati launches Beth and her mother into a whirlwind of travel and press coverage. Beth sets her sights on the U.S. open in Las Vegas.', 
  ContentTypeId: 3,
  Duration: 46
})

const contentQueensGambitS1E4 = await Content.create({
  Title:'Middle Game',
  ReleaseYear: '2020',
  Sinopse: 'Russian class opens the door to a new social scene. In Mexico City, Beth meets the intimidating Borgov, while her mother cozies up with a pen pal.', 
  ContentTypeId: 3,
  Duration: 49
})

const contentQueensGambitS1E5 = await Content.create({
  Title:'Fork',
  ReleaseYear: '2020',
  Sinopse: 'Back home in Kentucky, a shaken Beth reconnects with a former opponent who offers to help sharpen her game ahead of the U.S. Championship.', 
  ContentTypeId: 3,
  Duration: 48
})

const contentQueensGambitS1E6 = await Content.create({
  Title:'Adjournment',
  ReleaseYear: '2020',
  Sinopse: 'After training with Benny in New York, Beth heads to Paris for her rematch with Borgov. But a wild night sends her into a self-destructive spiral.', 
  ContentTypeId: 3,
  Duration: 60
})

const contentQueensGambitS1E7 = await Content.create({
  Title:'EndGame',
  ReleaseYear: '2020',
  Sinopse: 'A visit from an old friend forces Beth to reckon with her past and rethink her priorities, just in time for the biggest match of her life.', 
  ContentTypeId: 3,
  Duration: 68
})

// ------------Chernobyl----------- //

const contentChernobyl = await Content.create({
  Title: 'Chernobyl',
  ReleaseYear: '2019',
  Sinopse:
    "In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
  ImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/9/92/PosterChernobyl.jpg',
  TrailerUrl: 'https://youtu.be/s9APLXM9Ei8',
  ImdbRating: 9.4,
  Duration: 327,
  ContentTypeId: 2,

});
// Episodes
const contentChernobylS1E1 = await Content.create({
Title:'1:23:45',
ReleaseYear: '2019',
Sinopse: 'Plant workers and firefighters put their lives on the line to control a catastrophic April 1986 explosion at a Soviet nuclear power plant.', 
ContentTypeId: 3,
Duration: 58
})

const contentChernobylS1E2 = await Content.create({
Title:'Please Remain Calm',
ReleaseYear: '2019',
Sinopse: 'With untold millions at risk, Ulana makes a desperate attempt to reach Valery and warn him about the threat of a second explosion.', 
ContentTypeId: 3,
Duration: 65
})

const contentChernobylS1E3 = await Content.create({
Title:'Open Wide, O Earth',
ReleaseYear: '2019',
Sinopse: "Valery creates a detailed plan to decontaminate Chernobyl; Lyudmilla ignores warnings about her firefighter husband's contamination.", 
ContentTypeId: 3,
Duration: 65
})

const contentChernobylS1E4 = await Content.create({
Title:'Openings',
ReleaseYear: '2019',
Sinopse: 'The Happiness of All Mankind', 
ContentTypeId: 3,
Duration: 67
})

const contentChernobylS1E5 = await Content.create({
Title:'Vichnaya Pamyat',
ReleaseYear: '2019',
Sinopse: 'Valery, Boris and Ulana risk their lives and reputations to expose the truth about Chernobyl.', 
ContentTypeId: 3,
Duration: 72
})


  await contentLupin.addEpisode(contentLupinS1E1, { through: { SeasonNumber: 1, EpisodeNumber: 1 } })
  await contentLupin.addEpisode(contentLupinS1E2, { through: { SeasonNumber: 1, EpisodeNumber: 2 } })
  await contentLupin.addEpisode(contentLupinS1E3, { through: { SeasonNumber: 1, EpisodeNumber: 3 } })
  await contentLupin.addEpisode(contentLupinS1E4, { through: { SeasonNumber: 1, EpisodeNumber: 4 } })
  await contentLupin.addEpisode(contentLupinS1E5, { through: { SeasonNumber: 1, EpisodeNumber: 5 } })

  await contentQueensGambit.addEpisode(contentQueensGambitS1E1, { through: { SeasonNumber: 1, EpisodeNumber: 1 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E2, { through: { SeasonNumber: 1, EpisodeNumber: 2 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E3, { through: { SeasonNumber: 1, EpisodeNumber: 3 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E4, { through: { SeasonNumber: 1, EpisodeNumber: 4 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E5, { through: { SeasonNumber: 1, EpisodeNumber: 5 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E6, { through: { SeasonNumber: 1, EpisodeNumber: 6 } })
  await contentQueensGambit.addEpisode(contentQueensGambitS1E7, { through: { SeasonNumber: 1, EpisodeNumber: 7 } })

  await contentChernobyl.addEpisode(contentChernobylS1E1, { through: { SeasonNumber: 1, EpisodeNumber: 1 } })
  await contentChernobyl.addEpisode(contentChernobylS1E2, { through: { SeasonNumber: 1, EpisodeNumber: 2 } })
  await contentChernobyl.addEpisode(contentChernobylS1E3, { through: { SeasonNumber: 1, EpisodeNumber: 3 } })
  await contentChernobyl.addEpisode(contentChernobylS1E4, { through: { SeasonNumber: 1, EpisodeNumber: 4 } })
  await contentChernobyl.addEpisode(contentChernobylS1E5, { through: { SeasonNumber: 1, EpisodeNumber: 5 } })

  // ---------------------------------------------------------------------------------------------------------//

  // Add Services to User
  await contentUserRato.addServices([serviceDisney, serviceNetflix]);

  // Add Services to Content

  // Add Friends
  await contentUserRato.addFriend(contentUser5);
  await contentUser5.addFriend(contentUserRato);

  await contentUserRato.addFriend(contentUser6);
  await contentUser6.addFriend(contentUserRato);

  await contentUserRato.addFriend(contentUser7);
  await contentUser7.addFriend(contentUserRato);

  // Add Groups
  await contentGroup1.addUser(contentUserRato);
  await contentGroup1.addUser(contentUser7);
  await contentGroup1.addUser(contentUser8);
  await contentGroup1.addUser(contentUser9);
  await contentGroup1.addUser(contentUser5);

  await contentGroup2.addUser(contentUserRato);

  // Add Recommendations
  const friendshipUser1 = await Friendship.findOne({
    where: {
      UserId: contentUser7.Id,
      FriendId: contentUserRato.Id,
    },
  });
  const friendshipUser2 = await Friendship.findOne({
    where: {
      UserId: contentUser7.Id,
      FriendId: contentUserRato.Id,
    },
  });
  const friendshipUser3 = await Friendship.findOne({
    where: {
      UserId: contentUser5.Id,
      FriendId: contentUserRato.Id,
    },
  });
  await friendshipUser1.addContentRecommendation(contentSoul);
  await friendshipUser2.addContentRecommendation(contentAvengers);
  await friendshipUser3.addContentRecommendation(contentCoco);
};

module.exports = init;
