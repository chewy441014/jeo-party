const router = require('express').Router();
const { User } = require('../../models');

// The `/api/categories` endpoint


//login button --TODO
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

// Logout --TODO
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// router.get('/', async (req, res) => {
//   // find all categories
//   try {
//     const userRoute = await User.findAll;
//     res.status(200).json(userRoute);
//   } catch (err) {
//     res.status(500).json(err);
//     }
// });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
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

//Creating a new user and password
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Change a user or password - not functioning on site
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


//Delete a user or password - not functioning on site
router.delete('/:id', async (req, res) => {
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
