const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const vendors = require('./routes/api/vendors');

const app = express()

app.use(bodyParser.json())

const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(() => console.log("Mongo Connected..."))
    .catch(err => console.log(err));
 

app.use('/api/vendors', vendors);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


