const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense')
const budgetRouter = require('./routes/budget')

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ;

app.use(cors());

// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', 86400);
    next();
  });
  

app.use('/api/user', userRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/budget', budgetRouter);

app.get('/hello', (req, res) => res.send('Hello world.'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

