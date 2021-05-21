const express = require('express');
const todoRouter = express.Router();
const todoCtrl = require('./todo');

/* POST /post
{
  content: '내용'
}
*/
todoRouter.post('/', todoCtrl.write);
// DELETE /todo/:id
todoRouter.delete('/:id', todoCtrl.remove);

module.exports = todoRouter;
