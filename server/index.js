require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

const { PORT } = process.env;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
