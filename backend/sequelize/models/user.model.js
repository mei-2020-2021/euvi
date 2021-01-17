const Sequelize = require('sequelize');
const sequelize = require('../_index');

class User extends Sequelize.Model {}

User.init(
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Uid: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    FirstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    BirthDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    Email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

User.hasMany(User, {as: 'Friends'});

module.exports = User;
