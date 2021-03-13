import * as React from "react";
import { UserProfile } from "@auth0/nextjs-auth0";

type Props = {
  user: UserProfile;
};

const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <nav className="flex justify-between items-center py-10">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <div className="flex">
        {user && (
          <a
            href="/api/auth/logout"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Logout
          </a>
        )}
        {!user && (
          <a
            href="/api/auth/login"
            className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
