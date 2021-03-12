import Head from "next/head";
import Navbar from "../components/Navbar";
import { table, minifyRecords } from "./api/utils/Airtable";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

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

/*
 * This will automatically redirect to the auth0 login page if there is no valid session
 * This is not appropriate in our case, as there is only one page in this app.
  export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (_context) => {
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
    },
  });
*/

export async function getServerSideProps({ req, res } = context) {
  const session = getSession(req, res);

  let todos = [];

  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = "${session.user.sub}"`,
        })
        .firstPage();
    }

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        imitialTodos: todos,
        err: "Something went wrong",
      },
    };
  }
}
