const router = require('express').Router();
const { User } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const userRoute = await User.findAll;
    res.status(200).json(userRoute);
  } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const userRoute = await User.findByPk(req.params.id);
    if (!userRoute) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(userRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateUser) {
        res.status(404).json({ message: 'No User found with that id!' });
        return;
      }
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteRoute = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteRoute) {
      res.status(404).json({ message: 'No User found with that id!' });
      return;
    }
    res.status(200).json(deleteRoute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
