const { Budget, createTable } = require('../models/budget');
const express = require('express');
const router = express.Router();

createTable();

router.get('/:id', async (req, res) => {
try {
    var user_id = req.params.id
    const budgets = await Budget.getByUser(user_id);
    res.json(budgets);
    if (!budgets) {
    res.status(404).json({ message: 'No budgets found' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
});

// router.post('/', async (req, res) => {
//     try {
//         const budget = await Budget.getByUser();
//         res.json(budget);
//         if (!budget) {
//         res.status(404).json({ message: 'No budget found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// POST route to add a new budget
router.post('/addbudget', async (req, res) => {
    user_id = req.body.user_id
    console.log(user_id)
    housing = req.body.housing
    utilities = req.body.utilities
    transportation = req.body.transportation
    food = req.body.food
    entertainment = req.body.entertainment
    saving = req.body.saving
    miscellaneous = req.body.miscellaneous
    date = req.body.date
    month = req.body.month
    
    try {
    const result = await Budget.create(user_id, housing, utilities, transportation, food, entertainment, saving, miscellaneous, date, month);
    res.status(201).json(result);
    } catch (err) {
    console.error('Error adding budget:', err);
    res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT route to update an existing budget by user ID
// router.put('/addbudget/:uid/:month', async (req, res) => {
//     try {
//     const budget = await Budget.update(req.params.id, req.params.month, req.body);
//     if (budget) {
//         res.json(budget);
//     } else {
//         res.status(404).json({ message: 'Budget not found' });
//     }
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//     }
// });


// router.put('/addbudget/:uid/:month', async (req, res) => {
//     const userId = req.params.uid;
//     const month = req.params.month;
//     const updates = {};
//     const formFields = ['housing', 'utilities', 'transportation', 'food', 'entertainment', 'saving', 'miscellaneous'];

//     formFields.forEach(field => {
//     if (req.body[field] !== undefined && req.body[field] !== null) {
//         updates[field] = parseFloat(req.body[field]);
//     }
//     });

//     try {
//     const budget = await Budget.update(userId, month, updates);
//     if (budget) {
//         res.json(budget);
//     } else {
//         res.status(404).json({ message: 'Budget not found' });
//     }
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//     }
// });


router.put('/updatehousing/:uid/:month/:amount', async (req, res) => {
    const attribute = 'housing'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updateutl/:uid/:month/:amount', async (req, res) => {
    const attribute = 'utilities'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updatetrans/:uid/:month/:amount', async (req, res) => {
    const attribute = 'transportation'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updatefood/:uid/:month/:amount', async (req, res) => {
    const attribute = 'food'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updateent/:uid/:month/:amount', async (req, res) => {
    const attribute = 'entertainment'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updatesav/:uid/:month/:amount', async (req, res) => {
    const attribute = 'saving'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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

router.put('/updatemisc/:uid/:month/:amount', async (req, res) => {
    const attribute = 'miscellaneous'
    const userId = req.params.uid;
    const month = req.params.month;
    const amount = req.params.amount;

    try {
    const budget = await Budget.update(userId, month, amount, attribute);
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
