const Sequelize = require('sequelize');
const sequelize = require('../_index');
const ContentStatus = require('./contentStatus.model');

class StatusType extends Sequelize.Model {}

StatusType.init(
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
    modelName: 'StatusType',
  },
);

StatusType.hasOne(ContentStatus);

module.exports = StatusType;
