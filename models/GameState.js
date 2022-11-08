const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GameState extends Model { }

GameState.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'question',
            key: 'id',
          },
    },
    was_answered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'gameState',
    }
);

module.exports = GameState;