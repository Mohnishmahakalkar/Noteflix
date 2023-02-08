import React from "react";
import axios from "axios";

export function AddNewNote(props) {
  async function NewNote() {
    const addedNote = await axios.post(
      `http://localhost:4000/notesapp/notes/${props.userid}`,
      {
        noteName: "",
        note: "",
        status: "",
      }
    );
    props.changer(addedNote.data.note_id + 1)
  }

  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={NewNote}
      >
        Add New Note
      </button>
    </>
  );
}
