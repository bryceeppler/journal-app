import React from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";

type Props = object;

export default function Navbar({}: Props) {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  return (
    <div className="navbar bg-base-100">
      <div className="dropdown flex-none">
        <label tabIndex={1} className="btn-ghost btn-square btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100"
        >
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">
          Journal <span className="text-primary">Buddy</span>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-left">
          <label tabIndex={0} className="btn-ghost btn-square btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>{isSignedIn ? <SignOutButton /> : <SignInButton />}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
