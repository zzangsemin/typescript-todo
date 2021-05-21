const mongoose = require('mongoose');
const Todo = require('../models/todo');

const write = async (req, res) => {
  const { content } = req.body;
  const todo = new Todo({
    content,
    flag: false,
  });
  try {
    await todo.save();
    res.json(todo);
  } catch (e) {
    res.status(500).send(e);
  }
};

const change = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id).exec();
    if (!todo) {
      res.status(404).end();
      return;
    }
    todo.flag = !todo.flag;
    await todo.save();
    res.json(todo);
  } catch (e) {
    res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id).exec();
    res.status(204).end();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { write, remove, change };
