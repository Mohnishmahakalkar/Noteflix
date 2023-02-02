import React from "react";
import { Navbar } from "./Navbar";
import { Note } from "./Note";
import { Footer } from "./Footer";

export function UserPage() {
  return (
    <div class="place-items-center">
      <div class="pt-20">
        <Navbar/>
      </div>
      <div class="grid grid-cols-1 gap-4 place-items-center">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
      <div class="">
        <Footer />
      </div>
    </div>
  );
}
