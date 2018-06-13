const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// Connect mongoose to our database

const config = require('./config/database');
const app = express();

const bucketlist = require('./controllers/bucketlist');
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bucketlist', bucketlist);

app.get('/', (req, res) => {
  res.send('Invalid page');
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});


mongoose.connect(config.database);

