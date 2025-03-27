"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import SearchForm from "./SearchForm";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <nav
        className="bg-gradient-to-l from-navy to-grey
         text-white p-2 flex flex-col
         md:flex-row justify-between items-center fixed w-full
      drop-shadow-xl z-10"
      >
        <Link href="/" className="text-lg md:text-xl font-medium mb-2 md:mb-0">
          MOVIES-
          <span className="text-blue-500 text-xl md:text-2xl italic font-extrabold">
            HUB
          </span>
        </Link>
        <SearchForm />
        <div className="text-center p-0 pt-2 md:pt-0 md:p-2">
          {session ? (
            <>
              {(() => {
                const Name = session.user?.name?.trim().split(" ").shift();
                return <p>Welcome, {Name}</p>;
              })()}
              <button onClick={() => signOut()} className="text-blue-500">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => signIn()} className="text-blue-500">
              Sign In
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
