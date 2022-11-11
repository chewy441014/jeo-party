const sequelize = require('../config/connection');
const Question = require('../models/Questions');
const questionData = require('./jeopardy_qs.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Question.bulkCreate(questionData.slice(0,1000), {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();