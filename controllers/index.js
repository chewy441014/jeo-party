const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/game', gameRoutes);
router.use('/scores', highScoreRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/', homeRoutes);

module.exports = router;