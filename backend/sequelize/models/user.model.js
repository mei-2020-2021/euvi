const Sequelize = require('sequelize');
const sequelize = require('../_index');

class User extends Sequelize.Model {}

User.init(
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Uid: {
      type: Sequelize.DataTypes.STRING,
    	allowNull: false,
    },
    DisplayName: {
    	type: Sequelize.DataTypes.STRING,
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

module.exports = User;