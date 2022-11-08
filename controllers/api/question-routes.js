const router = require('express').Router();
const sequelize = require('sequelize');
const Question = require('../../models/Questions');

// The `/api/categories` endpoint

// // find all categories
// router.get('/', async (req, res) => {
//   try {
//     const questionRoute = await Question.findAll();
//     res.status(200).json(questionRoute);
//   } catch (err) {
//     res.status(500).json(err);
//     }
// });

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

// create a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(200).json(newQuestion);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a question by its `id` value
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

// delete a question by its `id` value
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

//get route for 4 random questions 
router.get('/rand-quest/:cat', async (req, res) => {
  try {
    const questionRoute = await Question.findAll({
      order: sequelize.literal('rand()'), limit: 4,
      where: {
        category: req.params.cat,
      }
    });
    if (!questionRoute) {
      res.status(404).json({ message: 'No question found!' });
      return;
    }
    res.status(200).json(questionRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get route for 5 random categories 
router.get('/rand-cat', async (req, res) => {
  try {
    const questionRoute = await Question.query(`SELECT DISTINCT category FROM question`,
      {
        order: sequelize.literal('rand()'),
        limit: 5
      });
    if (!questionRoute) {
      res.status(404).json({ message: 'No question found!' });
      return;
    }
    res.status(200).json(questionRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
