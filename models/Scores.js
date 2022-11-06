const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
        type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: "user",
        key: "username"
      }
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'score',
  }
);

module.exports = Score;