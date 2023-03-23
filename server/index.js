const express = require('express');
const app = express();
const userRouter = require('./routes/user');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

