const Sequelize = require('sequelize');
const sequelize = require('../_index');
const User = require('./user.model')
const Content = require('./content.model')
class Friendship extends Sequelize.Model {}

Friendship.init(
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
    modelName: 'Friendship',
  },
);


User.belongsToMany(User, {as: 'User', through: Friendship, primaryKey: true, foreignKey: 'UserId'});
User.belongsToMany(User, {as: 'Friend', through: Friendship, primaryKey: true, foreignKey: 'FriendId'});
module.exports = Friendship;
