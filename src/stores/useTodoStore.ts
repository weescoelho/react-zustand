import { create } from "zustand";

export type Todo = {
  id: string;
  description: string;
  done: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo: Todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id: string) =>
    set((state) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      state.todos[todoIndex].done = !state.todos[todoIndex].done;
      return { todos: state.todos };
    }),
}));
