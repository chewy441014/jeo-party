const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model { }

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    gameState_id: {
      type: DataTypes.UUID,
      references: {
        model: 'gameState',
        key: 'id',
      },
      allowNull: false,
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