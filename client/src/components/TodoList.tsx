import React, { useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { fetchTodos } from '../modules/todos';
import { Todo } from '../api/todoAPI';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (todos.isLoading) return <div>Loading...</div>;
  if (todos.error) return <div>{todos.error}</div>;
  // console.log(todos.todos);
  return (
    <TodoListBlock>
      {todos.todos.map((todo: Todo) => (
        <TodoItem
          key={todo._id}
          id={todo._id}
          text={todo.content}
          done={todo.flag}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
