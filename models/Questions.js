const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    air_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    round: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    show_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'question',
  }
);

module.exports = Question;