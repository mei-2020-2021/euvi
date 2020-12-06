const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model');

class ContentType extends Sequelize.Model {}

ContentType.init(
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Value: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'ContentType',
  },
);

ContentType.hasOne(Content);

module.exports = ContentType;
