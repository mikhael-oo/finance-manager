const {User, createTable} = require("../models/users");
const express = require("express");
const router = express.Router();


// Create users table
createTable();

router.get('/', async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
      if (!users) {
        res.status(404).json({ message: 'No users found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // GET route to retrieve a single user by ID
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // POST route to create a new user
  router.post('/register', async (req, res) => {
    var _fname = req.body.fname;
    console.log(_fname);
    var _lname = req.body.lname;
    console.log(_lname);
    var _email = req.body.email;
    console.log(_email);
    var _user = req.body.username;
    console.log(_user);
    var _pass = req.body.password;
    console.log(_pass);

    try {
      const user = await User.create(_fname, _lname, _email, _user, _pass);
      console.log(user);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // POST route to Login a new user
  router.post('/login', async (req, res) => {
    var _user = req.body.username;
    console.log(_user);
    var _pass = req.body.password;
    console.log(_pass);

    try {
      const user = await User.login(_user, _pass);
      if (user) {
        res.status(200).json({ user: { id: user.id } });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
      //console.log(user);
      //res.send('Login Successful.')
      //res.send(user.data)
      //res.status(200).json({ user: { id: user.id } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // PUT route to update an existing user by ID
  router.put('/:id', async (req, res) => {
    try {
      const user = await User.update(req.params.id, req.body);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // DELETE route to delete an existing user by ID
  router.delete('/:id', async (req, res) => {
    try {
      const user = await User.delete(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });



  router.put('/updatefname/:uid/:update', async (req, res) => {
    const attribute = 'first_name'
    const userId = req.params.uid;
    const update = req.params.update;

    try {
    const budget = await Budget.update(userId, attribute, update);
    if (budget) {
        res.json(budget);
    } else {
        res.status(404).json({ message: 'Budget not found' });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
});

router.put('/updatelname/:uid/:update', async (req, res) => {
  const attribute = 'last_name'
  const userId = req.params.uid;
  const update = req.params.update;

  try {
  const budget = await Budget.update(userId, attribute, update);
  if (budget) {
      res.json(budget);
  } else {
      res.status(404).json({ message: 'Budget not found' });
  }
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
  }
});

router.put('/updateuser/:uid/:update', async (req, res) => {
  const attribute = 'username'
  const userId = req.params.uid;
  const update = req.params.update;

  try {
  const budget = await Budget.update(userId, attribute, update);
  if (budget) {
      res.json(budget);
  } else {
      res.status(404).json({ message: 'Budget not found' });
  }
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
  }
});

router.put('/updateemail/:uid/:update', async (req, res) => {
  const attribute = 'email'
  const userId = req.params.uid;
  const update = req.params.update;

  try {
  const budget = await Budget.update(userId, attribute, update);
  if (budget) {
      res.json(budget);
  } else {
      res.status(404).json({ message: 'Budget not found' });
  }
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
  }
});

router.put('/updatepass/:uid/:update', async (req, res) => {
  const attribute = 'password'
  const userId = req.params.uid;
  const update = req.params.update;

  try {
  const budget = await Budget.update(userId, attribute, update);
  if (budget) {
      res.json(budget);
  } else {
      res.status(404).json({ message: 'Budget not found' });
  }
  } catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;