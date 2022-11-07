const sequelize = require('../config/connection');
const JepQuestion = require('../models/Questions');
const questionData = require('./jeopardy_qs.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await JepQuestion.bulkCreate(questionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();