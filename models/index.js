const User = require('./Users');
const Category = require('./Categories');
const Question = require('./Questions');
const Score = require('./Scores');
const Game = require('./Game');
const GameID = require('./GameID');

Category.hasMany(Question, {
  foreignKey: 'cat_name',
});

User.hasMany(Score, {
  foreignKey: 'username',
});
Game.hasOne(GameID, {
    foreignKey: 'game_id'
});

module.exports = { User, Category, Question, Score, GameID, Game };