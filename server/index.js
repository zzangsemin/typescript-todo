require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

const { PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world');
});
app.use('/', router);

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
