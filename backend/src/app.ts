const express = require("express");
import { Request, Response } from "express";
import { AppDataSource } from "./database/datasource";
import { Note } from "./database/entity/note.entity";
import { User } from "./database/entity/user.entity";
import bodyParser from "body-parser";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const port = 4000;
app.use(bodyParser.json());

app.post("/signup", async function (req: Request, res: Response) {
  const { fname, lname, email, password } = req.body;

  
  const checkEmail = await AppDataSource.getRepository(User).findOneBy({
    email: email,
  });

  if (checkEmail) {
    res.status(409).send({status :false , message :"email is already register"})
  }
  const user: User = new User();

  user.email = email;
  user.fname = fname;
  user.lname = lname;
  user.password = password;
  const results = await AppDataSource.getRepository(User).save(user);
  console.log(results, "result response");
  return res.status(201).send(results);
});

// app.delete("/users/:id", async function (req: Request, res: Response) {
//   const results = await AppDataSource.getRepository(User).delete(req.params.id)
//   return res.send(results)
// })

function main() {
  app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
  });
}

main();
