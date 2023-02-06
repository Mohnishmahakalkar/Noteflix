import React from "react";
import { Note } from "./Note";
import { Footer } from "./Footer";
import { UserNavbar } from "./UserNavbar";
import { useJwt } from "react-jwt";
import axios from "axios";
import { useRef } from "react";

export function UserPage() {
  const token = localStorage.getItem("token");
  const TokenVal = useJwt(token);
  const userId = Number(TokenVal.decodedToken)
  const userName = useRef(null)

  async function getData(event) {
    const user = await axios.get(`http://localhost:4000/notesapp/user/${userId}`);
    userName.value = `${user.fname} ${user.lname}`
  }
  
  getData();

  return (
    <div className="place-items-center">
      <div className="pt-20">
        <UserNavbar userName={userName} />
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center p-3">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
