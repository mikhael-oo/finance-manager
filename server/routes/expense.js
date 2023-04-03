const {Expense, createTable} = require("../models/expense");
const express = require("express");
const router = express.Router();

createTable();

router.get('/', async (req, res) => {

    try {
      const expense = await Expense.getAll();
      res.json(expense);
      if (!expense) {
        res.status(404).json({ message: 'No expenses found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.get('/list', async (req, res) => {

    var uid = parseInt(req.body.uid);
  if (isNaN(uid)) {
    console.log('NOT A NUMBER')
  } else {
    console.log('Continue')
  }
  
  try {
    const expense = await Expense.getbyId(uid);
    if (!expense) {
      res.status(404).json({ message: 'No expenses found' });
    }else {
      res.json(expense);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

  // POST route to add a new expenese
  router.post('/addexpense', async (req, res) => {
    var uid = req.body.uid;
    console.log(uid)
    var _expenseName = req.body.name;
    console.log(_expenseName);
    var _amount = req.body.amount;
    console.log(_amount);
    var _cat = req.body.category;
    console.log(_cat);
    var _date = req.body.date;
    console.log(_date);
    var _month = req.body.month;
    console.log(_month);

    try {
      const expense = await Expense.create(uid, _expenseName, _amount, _cat, _date, _month);
      console.log(expense);
      res.json(expense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;