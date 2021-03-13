import "tailwindcss/tailwind.css";
import { TodosProvider } from "../contexts/TodosContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  );
}

export default App;
