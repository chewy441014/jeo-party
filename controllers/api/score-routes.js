const router = require('express').Router();
const { Score } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const scoreRoute = await Score.findAll;
    res.status(200).json(scoreRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const scoreRoute = await Score.findByPk(req.params.id);
    if (!scoreRoute) {
      res.status(404).json({ message: 'No Score found with that id!' });
      return;
    }
    res.status(200).json(scoreRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newScore = await Score.create(req.body);
    res.status(200).json(newScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateScore = await Score.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateScore) {
        res.status(404).json({ message: 'No Score found with that id!' });
        return;
      }
    res.status(200).json(updateScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteRoute = await Score.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No Score found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
