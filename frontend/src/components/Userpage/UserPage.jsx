import { Note } from "../Userpage/Note";
import { Footer } from "../Footer";
import { AddNewNote } from "../Userpage/AddNewNote";
import { UserNavbar } from "./UserNavbar";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export function UserPage() {
  const [UserName, setUserName] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [changer, setChanger] = useState();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const TokenVal = useJwt(token);
  const userId = Number(TokenVal.decodedToken);
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get(
        `http://localhost:4000/notesapp/user/${userId}`
      );

      setUserName(`${user.data.fname} ${user.data.lname}`);

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
          ? Notes.map((note) => (
              <Note
                key={note.note_id}
                obj={note}
                changer={setChanger}
                userid={userId}
              />
            ))
          : null}
        <AddNewNote changer={setChanger} userid={userId} />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
