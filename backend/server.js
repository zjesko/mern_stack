const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

// Routes
const users = require('./routes/api/users');
const products = require('./routes/api/products');

const app = express()

app.use(express.json())

const db = config.get('mongoURI');
mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Mongo Connected..."))
    .catch(err => console.log(err));
 

app.use('/api/users', users);
app.use('/api/products', products);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


