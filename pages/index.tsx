import Head from "next/head";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import Pagination from "../components/Pagination";
import Notification from "../components/Notification";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect, useContext } from "react";
import { useUser, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { ITodo, ICursor, ContextType } from "../types";

import { gql } from "graphql-request";
import { graphQLClient } from "../utils/graphql-client";

export default function Home({
  initialTodos,
  initialCursor,
}: {
  initialTodos: ITodo[];
  initialCursor: ICursor;
}) {
  const { user, error } = useUser();
  const { todos, setTodos, cursor, setCursor, notification } = useContext(
    TodosContext
  ) as ContextType;

  useEffect(() => {
    setTodos(initialTodos);
    setCursor(initialCursor);
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
            <h1 className="text-2xl text-center mb-4">📝 My Todos ✅</h1>

            <Notification notification={notification} />

            <TodoForm />

            {error && <div>{error.message}</div>}

            <ul>
              {todos &&
                todos.map((todo) => <Todo key={todo._id} todo={todo} />)}
            </ul>

            <Pagination cursor={cursor} />
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
  let cursor: ICursor = {
    before: null,
    after: null,
  };

  try {
    if (session?.user) {
      const query = gql`
        query GetUserTodos($userId: String!) {
          allTodos(userId: $userId, _size: 10) {
            data {
              description
              completed
              userId
              _id
            }
            before
            after
          }
        }
      `;
      const variables = {
        userId: session.user.sub,
      };

      const { allTodos } = await graphQLClient.request(query, variables);
      if (allTodos) {
        todos = allTodos.data;
        cursor = { before: allTodos.before, after: allTodos.after };
      }
    }

    return {
      props: {
        initialTodos: todos,
        initialCursor: cursor,
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
