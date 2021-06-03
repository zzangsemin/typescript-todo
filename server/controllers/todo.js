const mongoose = require('mongoose');
const Todo = require('../models/todo');

exports.list = async (req, res) => {
  try {
    const todos = await Todo.find().exec();
    res.json(todos);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.write = async (req, res) => {
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

exports.change = async (req, res) => {
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

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id).exec();
    res.send(id);
  } catch (e) {
    res.status(500).send(e);
  }
};
