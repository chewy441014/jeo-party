const router = require('express').Router();
const { GameState } = require('../../models');

// The `/api/categories` endpoint
// create a new game
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const newGameState = await GameState.bulkCreate(req.body, {
      individualHooks: true,
      returning: true
    });
    req.session.save(() => {
      req.session.id = newGameState.id;
    });
    res.status(200).json(newGameState);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/activeGame/:game_id', async (req, res) => {
  try {
    const gameRoute = await GameState.findAll(req.body, {
      where: {
        game_id: req.params.game_id
      }
    });
    if (!gameRoute) {
      res.status(400).json({ message: 'No game found with that id!' });
      return;
    }
    res.status(200).json(gameRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find particular game route
router.get('/:id', async (req, res) => {
  try {
    const gameStateRoute = await GameState.findByPk(req.params.id);
    res.status(200).json(gameStateRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});



// update a game by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateGameState = await GameState.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateGameState) {
      res.status(404).json({ message: 'No GameState found with that id!' });
      return;
    }
    res.status(200).json(updateGameState);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a game by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteRoute = await GameState.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No GameState found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
