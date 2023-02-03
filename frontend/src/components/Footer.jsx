import React from "react";
export function Footer() {
  return (
    <footer class="fixed bottom-0 left-0 h-8 z-20 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-4 dark:bg-gray-800 dark:border-gray-600">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href="https://flowbite.com/" class="hover:underline">
          Mohnish Mahakalkar™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
