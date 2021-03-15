import { createContext, useState } from "react";
import { ITodo, ICursor, INotification, INotificationType } from "../types";

const TodosContext = createContext(null);

const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [cursor, setCursor] = useState<ICursor>({ before: null, after: null });
  const [notification, setNotification] = useState<INotification>({
    type: INotificationType.None,
    message: "",
  });

  const refreshTodos = async (size: Number, cursor: string) => {
    try {
      const res = await fetch("/api/getTodos", {
        method: "POST",
        body: JSON.stringify({ size, cursor }),
        headers: { "Content-Type": "application/json" },
      });
      const { data, before, after } = await res.json();

      setTodos(data);

      setCursor({
        before: before,
        after: after,
      });

      setNotification({
        type: INotificationType.Info,
        message: "Refreshed todos",
      });
    } catch (err) {
      console.error(err);
      setNotification({
        type: INotificationType.Error,
        message: "Failed to refresh todos",
      });
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

      setNotification({
        type: INotificationType.Success,
        message: "Added todo",
      });
    } catch (err) {
      console.error(err);
      setNotification({
        type: INotificationType.Error,
        message: "Failed to add todo",
      });
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

      setNotification({
        type: INotificationType.Success,
        message: "Updated todo",
      });
    } catch (err) {
      console.error(err);
      setNotification({
        type: INotificationType.Error,
        message: "Failed to update todo",
      });
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

      setNotification({
        type: INotificationType.Success,
        message: "Deleted todo",
      });
    } catch (err) {
      console.error(err);
      setNotification({
        type: INotificationType.Error,
        message: "Failed to delete todo",
      });
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
        cursor,
        setCursor,
        notification,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
