import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ITodo, ContextType } from "../types";

type Props = {
  todo: ITodo;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext) as ContextType;
  const [checked, setChecked] = useState<boolean>(false);
  const [isDeletingTodo, setIsDeletingTodo] = useState<boolean>(false);

  useEffect(() => {
    setChecked(todo.completed || false);
  }, []);

  const handleToggleCompleted = () => {
    const completed = !checked;

    setChecked(completed);

    const updatedTodo: ITodo = {
      ...todo,
      completed,
    };

    updateTodo(updatedTodo);
  };

  const handleDelete = async () => {
    setIsDeletingTodo(true);
    await deleteTodo(todo._id);
    setIsDeletingTodo(false);
  };

  return (
    <li
      key={todo._id}
      className="bg-white flex items-center shadow-lg rounder-lg my-2 py-2 px-4"
    >
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={checked}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={handleToggleCompleted}
      />

      <p className={`flex-1 text-gray-800 ${checked ? "line-through" : ""}`}>
        {todo.description}
      </p>

      <button
        type="button"
        className={`inline-flex justify-center items-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-white text-sm bg-red-500 hover:bg-red-600 focus:border-red-700 active:bg-red-700 transition ease-in-out duration-150 ${
          isDeletingTodo ? "cursor-not-allowed" : ""
        }`}
        disabled={isDeletingTodo}
        onClick={handleDelete}
      >
        {isDeletingTodo && (
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
            Delete
          </>
        )}
        {!isDeletingTodo && "Delete"}
      </button>
    </li>
  );
};

export default Todo;
