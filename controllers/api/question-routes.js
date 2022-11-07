const router = require('express').Router();
const { Question } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const questionRoute = await Question.findAll;
    res.status(200).json(questionRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
 try {
    const questionRoute = await Question.findByPk(req.params.id);
    if (!questionRoute) {
      res.status(404).json({ message: 'No question found with that id!' });
      return;
    }
    res.status(200).json(questionRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(200).json(newQuestion);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateQuestion = await Question.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateQuestion) {
        res.status(404).json({ message: 'No question found with that id!' });
        return;
      }
    res.status(200).json(updateQuestion);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteRoute = await Question.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No question found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
