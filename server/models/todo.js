const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  content: String,
  flag: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
