const User = require('./Users');
const Score = require('./Scores');
const Game = require('./Game');
const GameState = require('./GameState');
const Questions = require('./Questions')

User.hasMany(Score, {
  foreignKey: 'user_id',
});

Score.belongsTo(User, {
    foreignKey: 'user_id',
});

Game.hasMany(User, {
  foreignKey: 'user_id',
})

User.belongsTo(Game, {
  foreignKey: 'user_id'
})

Game.belongsToMany(GameState, {
  through: 'GameLink',
})

GameState.belongsToMany(Game, {
  through: 'GameLink',
})

GameState.hasMany(Questions, {
  foreignKey: 'question_id',
})

Questions.belongsTo(GameState, {
  foreignKey: 'question_id',
})

module.exports = { User, Score, Game, GameState};