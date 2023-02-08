import React from "react";
import axios from "axios";

export function Note(props) {
  async function deleteNote() {
    await axios.delete(
      `http://localhost:4000/notesapp/notes/${props.obj.note_id}`
    );
    props.changer(props.obj.note_id);
  }

  return (
    <div className="flex flex-row w-3/5 p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col w-full">
        <div className="flex flex-row ">
          <div className="w-full pl-1 py-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <input
              type="text"
              className="focus:outline-none w-3/4"
              placeholder="Note Name ..."
              defaultValue={props.obj.noteName}
            />
          </div>
          <div>
            <button onClick={deleteNote}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 pt-1"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>

        <textarea
          rows="4"
          className="resize-none px-1 pt-2 rounded-md focus:outline-none font-semibold"
          placeholder="Note ..."
          defaultValue={props.obj.note}
        ></textarea>
      </div>
    </div>
  );
}
