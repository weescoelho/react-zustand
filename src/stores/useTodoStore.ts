import { create } from "zustand";
import { persist } from "zustand/middleware";

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

// O uso do método persist, faz com que o estado seja persistido no navegador do usuário

export const useTodoStore = create(
  persist<TodoStore>(
    (set) => ({
      todos: [],
      addTodo: (todo: Todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),
      toggleTodo: (id: string) =>
        set((state) => {
          const todoIndex = state.todos.findIndex((todo) => todo.id === id);
          state.todos[todoIndex].done = !state.todos[todoIndex].done;
          return { todos: state.todos };
        }),
    }),
    {
      name: "todo-storage",
    },
  ),
);
