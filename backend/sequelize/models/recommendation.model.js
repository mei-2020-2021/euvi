const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model')
const Friendship = require('./friendship.model')
class Recommendation extends Sequelize.Model {}

Recommendation.init(
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'Recommendation',
  },
);

Content.belongsToMany(Friendship, {as: 'Friendship', through: Recommendation, primaryKey: true, foreignKey: 'FriendshipId'});
Friendship.belongsToMany(Content, {as: 'Content', through: Recommendation, primaryKey: true, foreignKey: 'ContentId'});
module.exports = Recommendation;