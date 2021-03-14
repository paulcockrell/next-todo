export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
  userId: string;
}

export interface ICursor {
  before: string | null;
  after: string | null;
}

export type ContextType = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;

  cursor: ICursor;
  setCursor: (cursor: ICursor) => void;

  refreshTodos: (size: Number, cursor: string) => void;
  addTodo: (description: string) => void;
  updateTodo: (updatedTodo: ITodo) => void;
  deleteTodo: (id: string) => void;
};
