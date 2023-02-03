import React from "react";
export function Note() {
  return (
    <div class="flex flex-col max-w-2xl p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-row my-2">
        <h5 class="w-full pl-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Note name
        </h5>
        <button class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      <p class="mb-3 p-1 font-normal text-gray-500 dark:text-gray-400">
        Go to this step by step guideline process on how to certify for your
        weekly benefits:Go to this step by step guideline process on how to
        certify for your weekly benefits:Go to this step by step guideline
        process on how to certify for your weekly benefits:
      </p>
    </div>
  );
}
