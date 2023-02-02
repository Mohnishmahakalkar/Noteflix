import React from "react";

export function Navbar() {
  return (
    <nav class="bg-slate-100 px-2 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <a href="localhoast:3000/" class="flex items-center">
          <img
            src="https://www.freepnglogos.com/uploads/note-png/note-change-website-articles-fliers-posting-guidelines-30.png"
            class="h-6 sm:h-9" 
            alt="Notes Logo"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Noteflix
          </span>
        </a>
        <div class="flex md:order-2">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
