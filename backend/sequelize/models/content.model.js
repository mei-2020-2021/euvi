const Sequelize = require('sequelize');
const sequelize = require('../_index');

class Content extends Sequelize.Model {}

Content.init(
  {
    Id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    ReleaseYear: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    Sinopse: {
      type: Sequelize.DataTypes.STRING,
    },
    ImageUrl: {
      type: Sequelize.DataTypes.STRING,
    },
    TrailerUrl: {
      type: Sequelize.DataTypes.STRING,
    },
    ImdbRating: {
      type: Sequelize.DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: 'Content',
  },
);

module.exports = Content;
