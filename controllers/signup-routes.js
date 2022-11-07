const router = require('express').Router();
const { Game } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const signupRoute = await Signup.findAll;
    res.status(200).json(signupRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

 // find one category by its `id` value
router.get('/:id', async (req, res) => {
 try {
    const signupRoute = await Signup.findByPk(req.params.id);
    if (!signupRoute) {
      res.status(404).json({ message: 'No Signup found with that id!' });
      return;
    }
    res.status(200).json(signupRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newSignup = await Signup.create(req.body);
    res.status(200).json(newSignup);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateSignup = await Signup.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateSignup) {
        res.status(404).json({ message: 'No Signup found with that id!' });
        return;
      }
    res.status(200).json(updateSignup);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteRoute = await Signup.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No Signup found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
