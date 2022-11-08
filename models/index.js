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
  foreignKey: 'username',
})

User.belongsTo(Game, {
  foreignKey: 'username'
})

Game.hasMany(GameState, {
  foreignKey: 'gameState_id',
})

GameState.belongsTo(Game, {
  foreignKey: 'gameState_id',
})

GameState.hasMany(Questions, {
  foreignKey: 'question_id',
})

Questions.belongsTo(GameState, {
  foreignKey: 'question_id',
})

module.exports = { User, Score, Game, GameState};