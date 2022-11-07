const router = require('express').Router();
const { update } = require('lodash');
const { highScore } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', async (req, res) => {
  try {
    const highScoreRoute = await highScore.findAll;
    res.status(200).json(highScoreRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

  // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const highScoreRoute = await highScore.findByPk(req.params.id);
    if (!highScoresRoute) {
      res.status(404).json({ message: 'No high score found with that id!' });
      return;
    }
    res.status(200).json(highScoreRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const newHighScore = await highScore.create(req.body);
    res.status(200).json(newHighScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateHighScore = await highScore.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateHighScore) {
        res.status(404).json({ message: 'No high score found with that id!' });
        return;
      }
    res.status(200).json(updateHighScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteRoute = await highScore.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No high score found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
