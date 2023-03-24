import { useState } from "react";
import "./App.css";
import { Todo, useTodoStore } from "./stores/useTodoStore";
import { v4 as uuid } from "uuid";

function App() {
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const todoStore = useTodoStore((state) => state);

  function createNewTodo() {
    const newTodo: Todo = {
      id: uuid(),
      description: newTodoDescription,
      done: false,
    };

    todoStore.addTodo(newTodo);
    setNewTodoDescription("");
  }

  return (
    <div className="App">
      {!!todoStore.todos.length &&
        todoStore.todos.map((todo) => (
          <div key={todo.id} style={{ display: "flex" }}>
            <input
              type="checkbox"
              defaultChecked={todo.done}
              onClick={() => todoStore.toggleTodo(todo.id)}
            />
            <p style={{ textDecoration: todo.done ? "line-through" : "none" }}>
              {todo.description}
            </p>
          </div>
        ))}

      <input
        type="text"
        onChange={({ target }) => setNewTodoDescription(target.value)}
        value={newTodoDescription}
      />
      <button onClick={createNewTodo}>add</button>
    </div>
  );
}

export default App;
