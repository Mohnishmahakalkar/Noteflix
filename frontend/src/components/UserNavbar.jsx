import React from "react";
import logo from "../logo/notess.png";

export function UserNavbar(prop) {
  return (
    <nav className="bg-slate-100 px-2 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="order-1">
        <a href="localhoast:3000/" className="flex items-center">
          <img src={logo} className="h-6 sm:h-9 pr-2" alt="Notes Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Notestick
          </span>
        </a>
        </div>
        <div className="order-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {prop.userName}
        </div>
        <div className="flex order-3">
          <a
            href="../"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
}
