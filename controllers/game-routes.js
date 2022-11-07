const router = require('express').Router();
const { Game } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const gameRoute = await Game.findAll;
    res.status(200).json(gameRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
 try {
    const gameRoute = await Game.findByPk(req.params.id);
    if (!gameRoute) {
      res.status(404).json({ message: 'No game found with that id!' });
      return;
    }
    res.status(200).json(gameRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newGame = await Game.create(req.body);
    res.status(200).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateGame = await Game.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateGame) {
        res.status(404).json({ message: 'No game found with that id!' });
        return;
      }
    res.status(200).json(updateGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteRoute = await Game.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No game found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;