import Head from "next/head";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";
import { useUser, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { ITodo, ContextType } from "../types";

import { gql } from "graphql-request";
import { graphQLClient } from "../utils/graphql-client";

export default function Home({ initialTodos }: { initialTodos: ITodo[] }) {
  const { user, error } = useUser();
  const { todos, setTodos } = useContext(TodosContext) as ContextType;

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
              {todos &&
                todos.map((todo) => <Todo key={todo._id} todo={todo} />)}
            </ul>
          </>
        )}
        {!user && <p>You should log in to save your todos</p>}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context.req, context.res);
  let todos: ITodo[] = [];

  try {
    if (session?.user) {
      const {
        allTodos: { data },
      } = await graphQLClient.request(
        gql`
          {
            allTodos {
              data {
                _id
                description
                completed
                userId
              }
            }
          }
        `
      );
      if (data) todos = data;
    }

    return {
      props: {
        initialTodos: todos,
      },
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        initialTodos: todos,
        err: "Something went wrong",
      },
    };
  }
};