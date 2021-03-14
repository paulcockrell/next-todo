import React, { useEffect, useState, useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ICursor, ContextType } from "../types/index";

type Props = {
  cursor: ICursor;
};

const Pagination: React.FC<Props> = ({ cursor }) => {
  const { refreshTodos } = useContext(TodosContext) as ContextType;

  const handleClick = (selectedCursor: string | null) => {
    refreshTodos(10, selectedCursor);
  };

  return (
    <div>
      <button
        type="button"
        disabled={cursor.before === null}
        className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
        onClick={() => handleClick(cursor.before)}
      >
        Previous
      </button>
      <button
        type="button"
        disabled={cursor.after === null}
        className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
        onClick={() => handleClick(cursor.after)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
