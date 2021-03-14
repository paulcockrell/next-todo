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
    <div className="text-center p-4">
      <button
        type="button"
        disabled={cursor.before === null}
        className={`bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-l ${
          !cursor.before ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleClick(cursor.before)}
      >
        Prev
      </button>
      <button
        type="button"
        disabled={cursor.after === null}
        className={`bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-r ${
          !cursor.after ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => handleClick(cursor.after)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
