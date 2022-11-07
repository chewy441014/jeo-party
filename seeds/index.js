const sequelize = require('../config/connection');
const Question = require('../models/Questions');
const Category = require('../models/Categories')
const questionData = require('./jeopardy_qs.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Question.bulkCreate(questionData, {
    individualHooks: true,
    returning: true,
  });
  await Category.bulkCreate(questionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();