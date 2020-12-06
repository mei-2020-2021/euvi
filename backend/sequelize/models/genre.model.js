const Sequelize = require('sequelize');
const sequelize = require('../_index');
const Content = require('./content.model');

class Genre extends Sequelize.Model {}

Genre.init(
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
    modelName: 'Genre',
  },
);

Genre.belongsToMany(Content, { through: 'ContentGenre' });
Content.belongsToMany(Genre, { through: 'ContentGenre' });

module.exports = Genre;
