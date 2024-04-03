"use client";

import Link from "next/link";
import React, { useState } from "react";
import LogOutBtn from "../LogOutBtn";
import { signOut } from "next-auth/react";

interface CollapsibleMenuProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const menuClassList = () => {
    const defaultClasses =
      "z-10 flex flex-col h-full transition-all duration-200";
    if (isOpen) {
      return [defaultClasses, "w-64"].join(" ");
    }
    return defaultClasses + " absolute w-10";
  };

  return (
    <div className={menuClassList()}>
      <button
        onClick={toggleMenu}
        className="sticky top-0 z-11 px-2 py-2 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        className={`flex-col items-start w-64 h-full pt-5 pb-4 bg-gray-800 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {/* Placeholder for menu items. Replace with your actual menu items */}
        <div className="w-full my-2">
          <Link
            href="/"
            className="flex w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Home
          </Link>
        </div>
        {props.user && (
          <div className="w-full my-2">
            <Link
              href="/new-recipe"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              New recipe
            </Link>
          </div>
        )}
        <div className=" flex-1"></div>
        <div className="w-full my-2 self-end flex">
          {props.user.email ? (
            <>
              <div className="w-1/4 p-2">
                {props.user.image && (
                  <img
                    src={props.user.image}
                    className="w-full rounded-full"
                    alt=""
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-bold text-white py-1 px-2 overflow-clip">
                  {props.user.name || props.user.email}
                </p>
                <button
                  onClick={() =>
                    signOut({ callbackUrl: window.location.origin + "/auth" })
                  }
                  className="text-white text-sm text-left py-1 px-2 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              className="text-white text-sm font-medium py-2 px-4 rounded bg-blue-300 hover:bg-blue-400"
              href="/auth"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
