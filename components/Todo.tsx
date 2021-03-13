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
    setChecked(todo.fields.completed || false);
  }, []);

  const handleToggleCompleted = () => {
    const completed = !todo.fields.completed;

    setChecked(completed);

    const updatedFields = {
      ...todo.fields,
      completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
  };

  return (
    <li className="bg-white flex items-center shadow-lg rounder-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={checked}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={handleToggleCompleted}
      />

      <p
        className={`flex-1 text-gray-800 ${
          todo.fields.completed ? "line-through" : ""
        }`}
      >
        {todo.fields.description}
      </p>

      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Todo;
