const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model');
const User = require('./user.model');

class SeriesEpisode extends Sequelize.Model {}

SeriesEpisode.init(
  {
    SeasonNumber: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    EpisodeNumber: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'SeriesEpisode',
  },
);

Content.belongsToMany(Content, {as: 'Series', through: SeriesEpisode, primaryKey: true, foreignKey: 'EpisodeId'});
Content.belongsToMany(Content, {as: 'Episode', through: SeriesEpisode, primaryKey: true, foreignKey: 'SeriesId'});

module.exports = SeriesEpisode;
