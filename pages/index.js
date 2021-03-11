import Head from "next/head";
import Navbar from "../components/Navbar";
import { table, minifyRecords } from "./api/utils/Airtable";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home({ initialTodos }) {
  const { user, error } = useUser();
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar user={user} />

      <main>
        {user && (
          <>
            <h1 className="text-2xl text-center mb-4">My Todos</h1>

            <TodoForm />

            {error && <div>{error.message}</div>}

            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(_context) {
  try {
    const todos = await table.select({}).firstPage();

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}
