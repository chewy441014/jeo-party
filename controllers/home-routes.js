const router = require('express').Router();
const { Home, User, Score, Question, GameState, Game } = require('../models');
//const withAuth = require('../utils/auth');

//Homepage route
router.get('/', async (req, res) => {
  try {
    res.render('home', {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// //TODO - potentially update later
// router.get('/game', async (req, res) => {
//   res.render('game');
// });

router.get('/game/:id', async (req, res) => {
  req.session.save(() => {
    req.session.gameId = req.params.id
  });
  res.render('game', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/login', async (req, res) => {
  res.render('login');
});
//high-scores home route  -- update top High Scores-- top 5 TODO
router.get('/high-scores', async (req, res) => {
  //add try catch -- call db to get all users high scores 
  try {
    const allHighScores = await Score.findAll({
      order: [
        ['score', 'DESC'],
      ],
    })
    console.log(allHighScores)
    res.render("high-scores", {
      topHighScores: allHighScores
    })
  } catch (err) {
    res.status(500).json(err);
  }

  res.render('high-scores');
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {


//sign up button -- TODO 
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
