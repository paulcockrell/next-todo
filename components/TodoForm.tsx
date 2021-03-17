import React, { useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ContextType } from "../types";

const TodoForm: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const { addTodo, isAddingTodo } = useContext(TodosContext) as ContextType;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTodo("");
    addTodo(todo);
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
        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:border-blue-700 active:bg-blue-700 transition ease-in-out duration-150 ${
          isAddingTodo ? "cursor-not-allowed" : ""
        }`}
        disabled={isAddingTodo}
      >
        {isAddingTodo && (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing
          </>
        )}
        {!isAddingTodo && "Submit"}
      </button>
    </form>
  );
};

export default TodoForm;
