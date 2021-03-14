import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ITodo, ContextType } from "../types";

type Props = {
  todo: ITodo;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext) as ContextType;
  const [checked, setChecked] = useState<boolean>(false);

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
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(todo._id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Todo;
