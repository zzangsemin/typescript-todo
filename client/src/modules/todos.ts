import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Todo,
  TodoResult,
  getTodos,
  addTodo,
  deleteTodo,
  changeTodo,
} from '../api/todoAPI';
import { Dispatch } from 'redux';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}
const todoInitialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null,
};

function startLoading(state: TodoState) {
  state.isLoading = true;
}
function loadingFailed(state: TodoState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: todoInitialState,
  reducers: {
    getTodosStart: startLoading,
    getTodosFailure: loadingFailed,
    getTodosSuccess(state, { payload }: PayloadAction<TodoResult>) {
      state.todos = payload.todos;
      state.isLoading = false;
      state.error = null;
    },
    addTodoSuccess(state, { payload }: PayloadAction<Todo>) {
      state.todos.push(payload);
      state.isLoading = false;
      state.error = null;
    },
    deleteTodoSuccess(state, { payload }: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo._id !== payload);
      state.isLoading = false;
      state.error = null;
    },
    changeTodoSuccess(state, { payload }: PayloadAction<Todo>) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === payload._id) return payload;
        else return todo;
      });
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const TodoActions = todosSlice.actions;
export default todosSlice.reducer;

export const fetchTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch(TodoActions.getTodosStart());
    const todos = await getTodos();
    dispatch(TodoActions.getTodosSuccess(todos));
  } catch (err) {
    dispatch(TodoActions.getTodosFailure(err.toString()));
  }
};

export const fetchAddTodo = (content: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(TodoActions.getTodosStart());
    const todo = await addTodo(content);
    dispatch(TodoActions.addTodoSuccess(todo));
  } catch (err) {
    dispatch(TodoActions.getTodosFailure(err.toString()));
  }
};

export const fetchDeleteTodo = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(TodoActions.getTodosStart());
    const todo = await deleteTodo(id);
    dispatch(TodoActions.deleteTodoSuccess(todo));
  } catch (err) {
    dispatch(TodoActions.getTodosFailure(err.toString()));
  }
};

export const fetchChangeTodo = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(TodoActions.getTodosStart());
    const todo = await changeTodo(id);
    dispatch(TodoActions.changeTodoSuccess(todo));
  } catch (err) {
    dispatch(TodoActions.getTodosFailure(err.toString()));
  }
};
