const {Expense, createTable} = require("../models/expense");
const express = require("express");
const router = express.Router();

createTable();

router.get('/', async (req, res) => {
    try {
      const users = await Exprense.getAll();
      res.json(users);
      if (!users) {
        res.status(404).json({ message: 'No expenses found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // POST route to add a new expenese
  router.post('/addexpense', async (req, res) => {
    var _expenseName = req.body.name;
    console.log(_expenseName);
    var _amount = req.body.amount;
    console.log(_amount);
    var _desc = req.body.description;
    console.log(_desc);
    var _cat = req.body.category;
    console.log(_cat);

    try {
      const expense = await Expense.create(_expenseName, _amount, _desc, _cat);
      console.log(expense);
      res.json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;