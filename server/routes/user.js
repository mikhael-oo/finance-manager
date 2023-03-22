const {User, createTable} = require("../models/users");
const express = require("express");
const router = express.Router();


// Create users table
createTable();

router.get('/users', async (req, res) => {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // GET route to retrieve a single user by ID
  router.get('/users/:id', async (req, res) => {
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
  router.post('/users', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // PUT route to update an existing user by ID
  router.put('/users/:id', async (req, res) => {
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
  router.delete('/users/:id', async (req, res) => {
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

module.exports = router;