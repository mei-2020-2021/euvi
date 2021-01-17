const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model');
const User = require('./user.model');

class ContentStatus extends Sequelize.Model {}

ContentStatus.init(
  {
    Feedback: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0
    },
    WatchedAt: {
      type: Sequelize.DataTypes.DATE
    },
  },
  {
    sequelize,
    modelName: 'ContentStatus',
    freezeTableName: true
  },
);

User.belongsToMany(Content, {as: 'WatchlistContent', through: ContentStatus, primaryKey: true, foreignKey: 'UserId'});
Content.belongsToMany(User, {as: 'Viewer', through: ContentStatus, primaryKey: true, foreignKey: 'ContentId'});

module.exports = ContentStatus;
