const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    num_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    game_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'game',
  }
);

module.exports = Game;