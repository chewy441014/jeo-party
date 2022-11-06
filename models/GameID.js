const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GameID extends Model {}

GameID.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'gameID',
  }
);

module.exports = GameID;