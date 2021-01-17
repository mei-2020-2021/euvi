const Sequelize = require('sequelize');
const sequelize = require('../_index');
const User = require('./user.model')
const Group = require('./group.model');

class GroupUsers extends Sequelize.Model {}

GroupUsers.init(
  {
    Id: {
		type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
	},
  },
  {
    sequelize,
    modelName: 'GroupUsers',
  },
);

User.belongsToMany(Group, { through: 'GroupUsers'});
Group.belongsToMany(User, { through: 'GroupUsers'});

module.exports = Group;