const User = require('./Users');
const Score = require('./Scores');

User.hasMany(Score, {
  foreignKey: 'username',
});

Score.belongsTo(User, {
    foreignKey: 'username',
});


module.exports = { User, Score, };