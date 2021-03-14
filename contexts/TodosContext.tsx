import { createContext, useState } from "react";
import { ITodo } from "../types";

const TodosContext = createContext(null);

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: { "Content-Type": "application/json" },
      });

      const newTodo: ITodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo: ITodo) => {
    try {
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: { "Content-Type": "application/json" },
      });

      await res.json();

      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        let existingTodo = existingTodos.find(
          (todo) => todo._id === updatedTodo._id
        );
        existingTodo = updatedTodo;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-Type": "application/json" },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo._id !== id);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
