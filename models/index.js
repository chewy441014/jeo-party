const User = require('./Users');
const Category = require('./Categories');
const Question = require('./Questions');
const Score = require('./Scores');

Category.hasMany(Question, {
  foreignKey: 'cat_name',
});

User.hasMany(Score, {
  foreignKey: 'username',
});
Question.belongsTo(Category, {
    foreignKey: 'cat_name',
});

Score.belongsTo(User, {
    foreignKey: 'username',
});


module.exports = { User, Category, Question, Score, };