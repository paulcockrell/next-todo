import React, { useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ContextType } from "../types";

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const { addTodo } = useContext(TodosContext) as ContextType;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(todo);
    setTodo("");
  };

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label htmlFor="todo" className="font-bold mb-2 text-gray-800">
          Todo
        </label>
        <input
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="ex. Learn about todos"
          className="border-gray-200 p-2 rounded-lg border appearance-none focus:outline-none focus:border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
      >
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
