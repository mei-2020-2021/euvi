const Sequelize = require('sequelize');
const sequelize = require('../_index');
const User = require('./user.model')

class Group extends Sequelize.Model {}

Group.init(
  {
    Id: {
		type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
	},
    
    Name: {
    	type: Sequelize.DataTypes.STRING,
		allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Group',
  },
);

User.hasOne(Group, {as: "Owner"})
User.belongsToMany(Group, { through: 'GroupUsers' });
Group.belongsToMany(User, { through: 'GroupUsers' });

module.exports = Group;