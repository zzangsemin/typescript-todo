const express = require('express');
const todoRouter = express.Router();
const todoCtrl = require('./todo');

/* POST /todo
{
  content: '내용'
}
*/
todoRouter.post('/', todoCtrl.write);
// GET /todo/:id
todoRouter.get('/:id', todoCtrl.change);
// DELETE /todo/:id
todoRouter.delete('/:id', todoCtrl.remove);

module.exports = todoRouter;
