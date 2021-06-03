import axios from 'axios';

export interface Todo {
  _id: string;
  content: string;
  flag: boolean;
  createdAt: string;
}
export interface TodoResult {
  todos: Todo[];
}

export async function getTodos(): Promise<TodoResult> {
  const url = 'http://localhost:4000/todo';

  try {
    const todoResponse = await axios.get<Todo[]>(url);
    return {
      todos: todoResponse.data,
    };
  } catch (err) {
    throw err;
  }
}

export async function addTodo(content: string): Promise<Todo> {
  const url = 'http://localhost:4000/todo';

  try {
    const todoResponse = await axios.post<Todo>(url, { content });
    return todoResponse.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteTodo(id: string): Promise<string> {
  const url = `http://localhost:4000/todo/${id}`;

  try {
    const todoResponse = await axios.delete<string>(url);
    return todoResponse.data;
  } catch (err) {
    throw err;
  }
}
