const router = require('express').Router();
const gameRoutes = require('./game-routes.js');
const questionRoutes = require('./question-routes.js');
const scoreRoutes = require('./score-routes.js');
const userRoutes = require('./user-routes.js');
const gameStateRoutes = require('./gameState-routes.js');

router.use('/games', gameRoutes);
router.use('/questions', questionRoutes);
router.use('/scores', scoreRoutes);
router.use('/users', userRoutes);
router.use('/gameStates', gameStateRoutes);

module.exports = router;
