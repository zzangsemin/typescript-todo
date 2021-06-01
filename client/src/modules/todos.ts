import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoResult, getTodos } from '../api/todoAPI';
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
  },
});

export const { getTodosStart, getTodosSuccess, getTodosFailure } =
  todosSlice.actions;
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
