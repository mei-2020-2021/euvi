const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model');
const User = require('./user.model');

class ContentStatus extends Sequelize.Model {}

ContentStatus.init(
  {
    Feedback: {
      type: Sequelize.DataTypes.ENUM('negative', 'neutral', 'positive'),
    },
  },
  {
    sequelize,
    modelName: 'ContentStatus',
    freezeTableName: true
  },
);

User.belongsToMany(Content, {through: ContentStatus});
Content.belongsToMany(User, {through: ContentStatus});

module.exports = ContentStatus;
