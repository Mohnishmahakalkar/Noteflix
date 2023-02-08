import { Note } from "./Note";
import { Footer } from "./Footer";
import { UserNavbar } from "./UserNavbar";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export function UserPage() {
  const token = localStorage.getItem("token");
  const TokenVal = useJwt(token);
  const userId = Number(TokenVal.decodedToken);
  const [UserName, setUserName] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [changer, setChanger] = useState();


  useEffect(() => {
    const getUser = async () => {

      console.log("calling get user")
      const user = await axios.get(
        `http://localhost:4000/notesapp/user/${userId}`
      );

      setUserName(`${user.data.fname} ${user.data.fname}`);

      console.log("Fetching notes")

      const notes = await axios.get(
        `http://localhost:4000/notesapp/notes/${userId}`
      );

      const { data } = notes;
      setNotes(data);
    };
    getUser();
  }, [changer, userId]);

  return (
    <div className="place-items-center">
      <div className="pb-16">
        <UserNavbar username={UserName} />
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center p-3">
        {Notes.length > 0
          ? Notes.map((note) => <Note key={note.note_id} obj={note} changer={setChanger} />)
          : null}
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
