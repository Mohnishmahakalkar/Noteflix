const express = require("express");
import { AppDataSource } from "./database/datasource";
import { Note } from "./database/entity/note.entity";
import { User } from "./database/entity/user.entity";
const app = express();
const port = 4000;



function main() {
  app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
  });
}

main();
