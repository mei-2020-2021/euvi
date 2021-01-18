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
  const serviceAppleTvPlus = await Service.create({
    Value: 'Apple TV+',
    IconUrl: 'https://pbs.twimg.com/profile_images/1110241147773829121/x5CQIvx7_400x400.png',
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
    FirstName: 'Demo',
    LastName: 'User',
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
  // ------------Lupin----------- //
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
    Title: 'Chapter 1',
    ReleaseYear: '2021',
    Sinopse:
      'Years after a tragic injustice involving his father, Assane seeks to settle a score, and a debt, by stealing a diamond necklace. However, the heist takes an unexpected turn.',
    ContentTypeId: 3,
    Duration: 47,
  });
  const contentLupinS1E2 = await Content.create({
    Title: 'Chapter 2',
    ReleaseYear: '2021',
    Sinopse:
      "Assane hatches a plot to contact Comet, an inmate who steers him to a clue about Babakar's demise. Anne Pellegrini comes clean about her past.",
    ContentTypeId: 3,
    Duration: 52,
  });
  const contentLupinS1E3 = await Content.create({
    Title: 'Chapter 3',
    ReleaseYear: '2021',
    Sinopse:
      "Assane confronts commissioner Dumont, and plants a decoy to divert the police. Hubert Pellegrini's connection to Babakar's fate is revealed.",
    ContentTypeId: 3,
    Duration: 42,
  });
  const contentLupinS1E4 = await Content.create({
    Title: 'Chapter 4',
    ReleaseYear: '2021',
    Sinopse:
      'Assane enlists the help of Journalist Fabienne Beriot to retrieve incriminating evidence on Hubert Pellegrini. Officer Guedira connects the dots around the Louvre heist.',
    ContentTypeId: 3,
    Duration: 47,
  });
  const contentLupinS1E5 = await Content.create({
    Title: 'Chapter 5',
    ReleaseYear: '2021',
    Sinopse:
      'While on his way to Etretat with Claire and Raoul, Assane encounters and unwelcome figure. In a bind, Assane sends a message to Captain Laugier.',
    ContentTypeId: 3,
    Duration: 43,
  });

  // ------------Queens Gambit----------- //
  const contentQueensGambit = await Content.create({
    Title: "Queen's Gambit",
    ReleaseYear: '2020',
    Sinopse:
      'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d3/The_Queen%27s_Gambit.jpg',
    TrailerUrl: 'https://youtu.be/CDrieqwSdgI',
    ImdbRating: 8.6,
    Duration: 395,
    ContentTypeId: 2,
  });
  // Episodes
  const contentQueensGambitS1E1 = await Content.create({
    Title: 'Openings',
    ReleaseYear: '2020',
    Sinopse:
      'Sent to an orphanage at age 9, Beth develops an uncanny knack for chess and a growing dependence on the green tranquilizers given to the children.',
    ContentTypeId: 3,
    Duration: 59,
  });

  const contentQueensGambitS1E2 = await Content.create({
    Title: 'Exchanges',
    ReleaseYear: '2020',
    Sinopse:
      'Suddenly plunged into a confusing new life in suburbia, teenage Beth studies her high school classmates and hatches a plan to enter a chess tournament.',
    ContentTypeId: 3,
    Duration: 65,
  });

  const contentQueensGambitS1E3 = await Content.create({
    Title: 'Doubled Pawns',
    ReleaseYear: '2020',
    Sinopse:
      'The trip to Cincinnati launches Beth and her mother into a whirlwind of travel and press coverage. Beth sets her sights on the U.S. open in Las Vegas.',
    ContentTypeId: 3,
    Duration: 46,
  });

  const contentQueensGambitS1E4 = await Content.create({
    Title: 'Middle Game',
    ReleaseYear: '2020',
    Sinopse:
      'Russian class opens the door to a new social scene. In Mexico City, Beth meets the intimidating Borgov, while her mother cozies up with a pen pal.',
    ContentTypeId: 3,
    Duration: 49,
  });

  const contentQueensGambitS1E5 = await Content.create({
    Title: 'Fork',
    ReleaseYear: '2020',
    Sinopse:
      'Back home in Kentucky, a shaken Beth reconnects with a former opponent who offers to help sharpen her game ahead of the U.S. Championship.',
    ContentTypeId: 3,
    Duration: 48,
  });

  const contentQueensGambitS1E6 = await Content.create({
    Title: 'Adjournment',
    ReleaseYear: '2020',
    Sinopse:
      'After training with Benny in New York, Beth heads to Paris for her rematch with Borgov. But a wild night sends her into a self-destructive spiral.',
    ContentTypeId: 3,
    Duration: 60,
  });

  const contentQueensGambitS1E7 = await Content.create({
    Title: 'EndGame',
    ReleaseYear: '2020',
    Sinopse:
      'A visit from an old friend forces Beth to reckon with her past and rethink her priorities, just in time for the biggest match of her life.',
    ContentTypeId: 3,
    Duration: 68,
  });

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
    Title: '1:23:45',
    ReleaseYear: '2019',
    Sinopse:
      'Plant workers and firefighters put their lives on the line to control a catastrophic April 1986 explosion at a Soviet nuclear power plant.',
    ContentTypeId: 3,
    Duration: 58,
  });

  const contentChernobylS1E2 = await Content.create({
    Title: 'Please Remain Calm',
    ReleaseYear: '2019',
    Sinopse:
      'With untold millions at risk, Ulana makes a desperate attempt to reach Valery and warn him about the threat of a second explosion.',
    ContentTypeId: 3,
    Duration: 65,
  });

  const contentChernobylS1E3 = await Content.create({
    Title: 'Open Wide, O Earth',
    ReleaseYear: '2019',
    Sinopse:
      "Valery creates a detailed plan to decontaminate Chernobyl; Lyudmilla ignores warnings about her firefighter husband's contamination.",
    ContentTypeId: 3,
    Duration: 65,
  });

  const contentChernobylS1E4 = await Content.create({
    Title: 'Openings',
    ReleaseYear: '2019',
    Sinopse: 'The Happiness of All Mankind',
    ContentTypeId: 3,
    Duration: 67,
  });

  const contentChernobylS1E5 = await Content.create({
    Title: 'Vichnaya Pamyat',
    ReleaseYear: '2019',
    Sinopse: 'Valery, Boris and Ulana risk their lives and reputations to expose the truth about Chernobyl.',
    ContentTypeId: 3,
    Duration: 72,
  });

  // ------------Away----------- //

  const contentAway = await Content.create({
    Title: 'Away',
    ReleaseYear: '2020',
    Sinopse:
      'An American astronaut struggles with leaving her husband and daughter behind to embark on a dangerous mission with an international space crew.',
    ImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/9/92/PosterChernobyl.jpg',
    TrailerUrl: 'https://youtu.be/3f_REapPwio',
    ImdbRating: 6.6,
    Duration: 498,
    ContentTypeId: 2,
  });

// Episodes
const contentAwayS1E1 = await Content.create({
  Title:'Go',
  ReleaseYear: '2020',
  Sinopse: 'As the mission launches, Emma finds her mettle as commander tested by an onboard accident, a divided crew and a family emergency back on earth.', 
  ContentTypeId: 3,
  Duration: 57
})

const contentAwayS1E2 = await Content.create({
  Title:'Negative Return',
  ReleaseYear: '2020',
  Sinopse: "When a ship malfunction threatens the voyage before it's barely begun, Emma works with a wary Mishra on a high risk repair operation.", 
  ContentTypeId: 3,
  Duration: 49
})

const contentAwayS1E3 = await Content.create({
  Title:'Half the Sky',
  ReleaseYear: '2020',
  Sinopse: 'The PRC demands CNSA remove Mei Chen from her assignment as an Atlas CAPCOM, which upsets Lu as they are secret lovers.', 
  ContentTypeId: 3,
  Duration: 49
})

const contentAwayS1E4 = await Content.create({
  Title:'Excellent Chariots',
  ReleaseYear: '2020',
  Sinopse: 'Ram endangers the lives of everyone on the Atlas, causing Emma to put herself in harms way; Matt must make a life-changing decision.', 
  ContentTypeId: 3,
  Duration: 44
})

const contentAwayS1E5 = await Content.create({
  Title:'Space Dogs',
  ReleaseYear: '2020',
  Sinopse: 'As Christmas approaches, the crew prepares to make their final calls home before communication grows spotty. Matt and Lex adjust to their new normal.', 
  ContentTypeId: 3,
  Duration: 55
})

const contentAwayS1E6 = await Content.create({
  Title:'A Little Faith',
  ReleaseYear: '2020',
  Sinopse: "Tempers flare on the Atlas over a water-system glitch and an act of betrayal; Matt meets Lex's new friend while working on the ship's issues.", 
  ContentTypeId: 3,
  Duration: 49
})

const contentAwayS1E7 = await Content.create({
  Title:'Goodnight Mars',
  ReleaseYear: '2020',
  Sinopse: "Emma's behavior becomes a cause for concern, Kwesi and Lu team up on a plant mystery, and Lex makes an impulsive decision with far-reaching consequences.", 
  ContentTypeId: 3,
  Duration: 51
})

const contentAwayS1E8 = await Content.create({
  Title:'Vital Signs',
  ReleaseYear: '2020',
  Sinopse: "A problem with Atlas's supply ship jeopardizes the mission and sparks questions about Emma's commitment to landing on Mars.", 
  ContentTypeId: 3,
  Duration: 49
})

const contentAwayS1E9 = await Content.create({
  Title:'Spektr',
  ReleaseYear: '2020',
  Sinopse: 'Emotions run high as rapidly dwindling water rations on the Atlas leave the crew and Mission Control scrambling to find a fix before time runs out.', 
  ContentTypeId: 3,
  Duration: 46
})

const contentAwayS1E10 = await Content.create({
  Title:'Home',
  ReleaseYear: '2020',
  Sinopse: "With only hours to go before Atlas' planned touchdown on Mars, Emma is confronted with everything that could go wrong, while Lu receives new orders.", 
  ContentTypeId: 3,
  Duration: 49
})


// ------------The Society----------- //

const contentTheSociety = await Content.create({
  Title: 'The Society',
  ReleaseYear: '2019',
  Sinopse: 'When everyone else mysteriously vanishes from their wealthy town, the teen residents of West Ham must forge their own society to survive.',
  ImageUrl: 'https://upload.wikimedia.org/wikipedia/pt/c/c7/Title_screen_for_The_Society.png',
  TrailerUrl: 'https://youtu.be/lSj77j1Dnxg',
  ImdbRating: 7.1,
  Duration: 558,
  ContentTypeId: 2,
});

// Episodes
const contentTheSocietyS1E1 = await Content.create({
Title:'What Happened?',
ReleaseYear: '2019',
Sinopse: 'After their class trip is cut short, students at West Ham High School return home to discover their town is completely empty.', 
ContentTypeId: 3,
Duration: 58
})

const contentTheSocietyS1E2 = await Content.create({
Title:'Our Town',
ReleaseYear: '2019',
Sinopse: "Cassandra and her friends prepare for an uncertain future, while Harry's crew just want to party; Sam and Becca make a discovery.", 
ContentTypeId: 3,
Duration: 58
})

const contentTheSocietyS1E3 = await Content.create({
Title:"Childhood's End",
ReleaseYear: '2019',
Sinopse: 'After the boys ransack the store, Cassandra rallies the girls to exert their power; The students plan a prom; Kelly discovers a family secret.', 
ContentTypeId: 3,
Duration: 60
})

const contentTheSocietyS1E4 = await Content.create({
Title:'Drop by Drop',
ReleaseYear: '2019',
Sinopse: "A shocking event puts everyone on edge; As chaos sets in, Allie's friends urge her to step up and lead; Geordie conducts an investigation.", 
ContentTypeId: 3,
Duration: 56
})

const contentTheSocietyS1E5 = await Content.create({
Title:'Putting on the Clothes',
ReleaseYear: '2019',
Sinopse: "A student's confession leads to an arrest and a trial; Elle experiences Campbell's dark side; Harry's drug use escalates.", 
ContentTypeId: 3,
Duration: 53
})

const contentTheSocietyS1E6 = await Content.create({
Title:'Like a F-ing God or Something',
ReleaseYear: '2019',
Sinopse: "Allie questions Elle about Campbell; As the town grows restless awaiting Allie's decision, Will and Grizz push for harsh measures.", 
ContentTypeId: 3,
Duration: 48
})

const contentTheSocietyS1E7 = await Content.create({
Title:"Allie's Rules",
ReleaseYear: '2019',
Sinopse: 'Six months later, Harry sinks deeper into depression; Grizz and Sam bond; Gordie arrives at a theory about West Ham; Elle puts a plan into action.', 
ContentTypeId: 3,
Duration: 53
})

const contentTheSocietyS1E8 = await Content.create({
Title:'Poison',
ReleaseYear: '2019',
Sinopse: 'A Thanksgiving feast takes a frightening turn; In the aftermath, the Guard oversteps its powers; Sam is torn between Becca and Grizz.', 
ContentTypeId: 3,
Duration: 53
})

const contentTheSocietyS1E9 = await Content.create({
Title:'New Names',
ReleaseYear: '2019',
Sinopse: 'Will tells Allie he has feelings for her; Elle confides in Helena; Campbell pressures Harry to run for mayor; Grizz leads an expedition.', 
ContentTypeId: 3,
Duration: 60
})

const contentTheSocietyS1E10 = await Content.create({
Title:'How It Happens',
ReleaseYear: '2019',
Sinopse: 'Campbell plots a coup with Lexie and the Guard; Kelly spots something suspicious in a photo; Becca goes into labor; The expedition returns with news.', 
ContentTypeId: 3,
Duration: 59
})


// ------------Umbrella Academy----------- //
const contentUmbrellaAcademy = await Content.create({
  Title: 'The Umbrella Academy',
  ReleaseYear: '2019',
  Sinopse: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.',
  ImageUrl: 'https://br.web.img3.acsta.net/c_225_300/pictures/18/12/10/14/01/0178829.jpg',
  TrailerUrl: 'https://youtu.be/0DAmWHxeoKw',
  ImdbRating: 8.0,
  Duration: 1026,
  ContentTypeId: 2,
});

// Episodes
const contentUmbrellaAcademyS1E1 = await Content.create({
Title:'We Only See Each Other at Weddings and Funerals',
ReleaseYear: '2019',
Sinopse: "Years after they rose to fame as young crime-fighting superheroes, the estranged Hargreeves siblings come together to mark their father's death.", 
ContentTypeId: 3,
Duration: 59
})

const contentUmbrellaAcademyS1E2 = await Content.create({
Title:'Run Boy Run',
ReleaseYear: '2019',
Sinopse: 'After sharing the story of his time travel with Vanya, Five hunts for the owner of a fake eye. But two mysterious assassins are hot on his trail.', 
ContentTypeId: 3,
Duration: 58
})

const contentUmbrellaAcademyS1E3 = await Content.create({
Title:'Extra Ordinary',
ReleaseYear: '2019',
Sinopse: 'Worried their mother is hiding something, Luther and Allison call a family meeting. Cha-Cha and Hazel catch a big break in their hunt for Five.', 
ContentTypeId: 3,
Duration: 56
})

const contentUmbrellaAcademyS1E4 = await Content.create({
Title:'Man on the Moon',
ReleaseYear: '2019',
Sinopse: "The story of Luther's transformation emerges. At the motel, Klaus puts Hazel and Cha-Cha's training to the test. Allison grows suspicious of Leonard.", 
ContentTypeId: 3,
Duration: 57
})

const contentUmbrellaAcademyS1E5 = await Content.create({
Title:'Number Five',
ReleaseYear: '2019',
Sinopse: 'Five lets Luther in on his secret, Klaus returns from a harrowing trip through time, and Vanya begins to feel different without her meds.', 
ContentTypeId: 3,
Duration: 59
})

const contentUmbrellaAcademyS1E6 = await Content.create({
Title:"The Day That Wasn't",
ReleaseYear: '2019',
Sinopse: 'Sparks fly when Vanya finds her siblings holding an emergency family meeting without her. Five starts his new job at HQ. Cha-Cha faces a dilemma.', 
ContentTypeId: 3,
Duration: 57
})

const contentUmbrellaAcademyS1E7 = await Content.create({
Title:'The Day That Was',
ReleaseYear: '2019',
Sinopse: 'With a second chance at the day, the siblings team up to find the mysterious "Harold Jenkins." Leonard takes Vanya into the woods to test her powers.', 
ContentTypeId: 3,
Duration: 56
})

const contentUmbrellaAcademyS1E8 = await Content.create({
Title:'I Heard a Rumor',
ReleaseYear: '2019',
Sinopse: 'As Vanya practices controlling her new abilities, Allison tags along with a local cop to find out what happened outside the restaurant.', 
ContentTypeId: 3,
Duration: 51
})

const contentUmbrellaAcademyS1E9 = await Content.create({
Title:'Changes',
ReleaseYear: '2019',
Sinopse: 'Vanya veers between shock and despair as she makes a string of unsettling discoveries. A serendipitous development leaves Five at loose ends.', 
ContentTypeId: 3,
Duration: 44
})

const contentUmbrellaAcademyS1E10 = await Content.create({
Title:'The White Violin',
ReleaseYear: '2020',
Sinopse: 'As a lifetime of secrets and resentment bring the Umbrella Academy crashing down, the Hargreeves siblings realize the worst is still to come.', 
ContentTypeId: 3,
Duration: 46
})

const contentUmbrellaAcademyS2E1 = await Content.create({
Title:'Right Back Where We Started',
ReleaseYear: '2020',
Sinopse: 'After dropping his siblings into an alley in Dallas - in different years - Five scrambles to track them all down and stop a new doomsday threat.', 
ContentTypeId: 3,
Duration: 47
})

const contentUmbrellaAcademyS2E2 = await Content.create({
Title:'The Frankel Footage',
ReleaseYear: '2020',
Sinopse: "An incident at the bar leads Luther to Vanya. Five finds an unsettling surprise in the film Hazel left behind. The cops come after Allison's husband.", 
ContentTypeId: 3,
Duration: 48
})

const contentUmbrellaAcademyS2E3 = await Content.create({
Title:'The Swedish Job',
ReleaseYear: '2020',
Sinopse: 'As the sit-in approaches, Allison reconnects with Klaus. The Swedes chase Vanya into a cornfield. Luther makes a distressing discovery.', 
ContentTypeId: 3,
Duration: 48
})

const contentUmbrellaAcademyS2E4 = await Content.create({
Title:'The Magestic 12',
ReleaseYear: '2020',
Sinopse: 'While Allison searches frantically for Ray, Vanya contends with a crisis at the farm. Meanwhile, Five, Diego and Lila crash a party at the Mexican Consulate.', 
ContentTypeId: 3,
Duration: 49
})

const contentUmbrellaAcademyS2E5 = await Content.create({
Title:'Valhalla',
ReleaseYear: '2020',
Sinopse: 'Summoned to an emergency meeting, the siblings hatch very different plans for how to spend their last six days on Earth. Lila confronts her mother.', 
ContentTypeId: 3,
Duration: 48
})

const contentUmbrellaAcademyS2E6 = await Content.create({
Title:'A Light Supper',
ReleaseYear: '2020',
Sinopse: "Allison gives Ray a peek at her powers. Dave visits Klaus's compound. The Handler offers Five a deal, and the siblings meet their father for dinner.", 
ContentTypeId: 3,
Duration: 50
})

const contentUmbrellaAcademyS2E7 = await Content.create({
Title:'Oga for Oga',
ReleaseYear: '2020',
Sinopse: 'After Five travels to 1982 to carry out his new mission, the siblings face a flurry of difficult decisions. Meanwhile, Carl issues a warning to Vanya.', 
ContentTypeId: 3,
Duration: 47
})

const contentUmbrellaAcademyS2E8 = await Content.create({
Title:'The Seven Stages',
ReleaseYear: '2020',
Sinopse: 'A desperate Five concocts a risky plan to intercept another version of himself. The FBI tortures Vanya. Diego discovers what causes the apocalypse.', 
ContentTypeId: 3,
Duration: 47
})

const contentUmbrellaAcademyS2E9 = await Content.create({
Title:'743',
ReleaseYear: '2020',
Sinopse: 'As the Fives plot against each other, one of the siblings makes a big sacrifice to help Vanya. Plus, Lila learns the truth about her parents.', 
ContentTypeId: 3,
Duration: 40
})

const contentUmbrellaAcademyS2E10 = await Content.create({
Title:'The End of Something',
ReleaseYear: '2020',
Sinopse: 'Reeling from the events at Dealey Plaza, the siblings head to the farm to help save Harlan - only to find themselves drawn into a deadly showdown.', 
ContentTypeId: 3,
Duration: 59
})




  await contentLupin.addEpisode(contentLupinS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentLupin.addEpisode(contentLupinS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentLupin.addEpisode(contentLupinS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentLupin.addEpisode(contentLupinS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentLupin.addEpisode(contentLupinS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});

  await contentQueensGambit.addEpisode(contentQueensGambitS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E6, {through: {SeasonNumber: 1, EpisodeNumber: 6}});
  await contentQueensGambit.addEpisode(contentQueensGambitS1E7, {through: {SeasonNumber: 1, EpisodeNumber: 7}});

  await contentChernobyl.addEpisode(contentChernobylS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentChernobyl.addEpisode(contentChernobylS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentChernobyl.addEpisode(contentChernobylS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentChernobyl.addEpisode(contentChernobylS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentChernobyl.addEpisode(contentChernobylS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});

  await contentAway.addEpisode(contentAwayS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentAway.addEpisode(contentAwayS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentAway.addEpisode(contentAwayS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentAway.addEpisode(contentAwayS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentAway.addEpisode(contentAwayS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});
  await contentAway.addEpisode(contentAwayS1E6, {through: {SeasonNumber: 1, EpisodeNumber: 6}});
  await contentAway.addEpisode(contentAwayS1E7, {through: {SeasonNumber: 1, EpisodeNumber: 7}});
  await contentAway.addEpisode(contentAwayS1E8, {through: {SeasonNumber: 1, EpisodeNumber: 8}});
  await contentAway.addEpisode(contentAwayS1E9, {through: {SeasonNumber: 1, EpisodeNumber: 9}});
  await contentAway.addEpisode(contentAwayS1E10, {through: {SeasonNumber: 1, EpisodeNumber: 10}});

  await contentTheSociety.addEpisode(contentTheSocietyS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E6, {through: {SeasonNumber: 1, EpisodeNumber: 6}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E7, {through: {SeasonNumber: 1, EpisodeNumber: 7}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E8, {through: {SeasonNumber: 1, EpisodeNumber: 8}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E9, {through: {SeasonNumber: 1, EpisodeNumber: 9}});
  await contentTheSociety.addEpisode(contentTheSocietyS1E10, {through: {SeasonNumber: 1, EpisodeNumber: 10}});

  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E1, {through: {SeasonNumber: 1, EpisodeNumber: 1}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E2, {through: {SeasonNumber: 1, EpisodeNumber: 2}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E3, {through: {SeasonNumber: 1, EpisodeNumber: 3}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E4, {through: {SeasonNumber: 1, EpisodeNumber: 4}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E5, {through: {SeasonNumber: 1, EpisodeNumber: 5}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E6, {through: {SeasonNumber: 1, EpisodeNumber: 6}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E7, {through: {SeasonNumber: 1, EpisodeNumber: 7}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E8, {through: {SeasonNumber: 1, EpisodeNumber: 8}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E9, {through: {SeasonNumber: 1, EpisodeNumber: 9}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS1E10, {through: {SeasonNumber: 1, EpisodeNumber: 10}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E1, {through: {SeasonNumber: 2, EpisodeNumber: 1}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E2, {through: {SeasonNumber: 2, EpisodeNumber: 2}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E3, {through: {SeasonNumber: 2, EpisodeNumber: 3}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E4, {through: {SeasonNumber: 2, EpisodeNumber: 4}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E5, {through: {SeasonNumber: 2, EpisodeNumber: 5}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E6, {through: {SeasonNumber: 2, EpisodeNumber: 6}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E7, {through: {SeasonNumber: 2, EpisodeNumber: 7}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E8, {through: {SeasonNumber: 2, EpisodeNumber: 8}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E9, {through: {SeasonNumber: 2, EpisodeNumber: 9}});
  await contentUmbrellaAcademy.addEpisode(contentUmbrellaAcademyS2E10, {through: {SeasonNumber: 2, EpisodeNumber: 10}});

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
