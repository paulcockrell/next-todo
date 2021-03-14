export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
  userId: string;
}

export type ContextType = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  refreshTodos: () => void;
  addTodo: (description: string) => void;
  updateTodo: (updatedTodo: ITodo) => void;
  deleteTodo: (id: string) => void;
};
