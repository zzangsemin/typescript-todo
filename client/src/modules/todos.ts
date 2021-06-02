import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoResult, getTodos, addTodo } from '../api/todoAPI';
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
    getTodosSuccess(state, { payload }: PayloadAction<TodoResult>) {
      state.todos = payload.todos;
      state.isLoading = false;
      state.error = null;
    },
    getTodosFailure: loadingFailed,
    addTodoSuccess(state, { payload }: PayloadAction<Todo>) {
      state.todos.push(payload);
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  getTodosStart,
  getTodosSuccess,
  getTodosFailure,
  addTodoSuccess,
} = todosSlice.actions;
export default todosSlice.reducer;

export const fetchTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getTodosStart());
    const todos = await getTodos();
    dispatch(getTodosSuccess(todos));
  } catch (err) {
    dispatch(getTodosFailure(err.toString()));
  }
};

export const fetchAddTodo = (content: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(getTodosStart());
    const todo = await addTodo(content);
    dispatch(addTodoSuccess(todo));
  } catch (err) {
    dispatch(getTodosFailure(err.toString()));
  }
};
