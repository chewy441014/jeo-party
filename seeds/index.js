const sequelize = require('../config/connection');
const JepQuestion = require('../models/Questions');
const questionData = require('./jeopardy_qs.json');
const smallQuestionData = questionData.slice(0,1000);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await JepQuestion.bulkCreate(smallQuestionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();