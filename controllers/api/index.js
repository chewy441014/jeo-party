const router = require('express').Router();
const categoryRoutes = require('./category-routes.js');
const gameRoutes = require('./game-routes.js');
const questionRoutes = require('./question-routes.js');
const scoreRoutes = require('./score-routes.js');
const userRoutes = require('./user-routes.js');
const gameIdRoutes = require('./gameId-routes.js');

router.use('/categories', categoryRoutes);
router.use('/games', gameRoutes);
router.use('/questions', questionRoutes);
router.use('/scores', scoreRoutes);
router.use('/users', userRoutes);
router.use('/gameId', gameIdRoutes);

module.exports = router;
