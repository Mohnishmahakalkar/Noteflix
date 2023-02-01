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

/* signup user */
app.post("/notesapp/signup", async function (req: Request, res: Response) {
  const { fname, lname, email, password } = req.body;

  const checkEmail = await AppDataSource.getRepository(User).findOneBy({
    email: email,
  });

  if (checkEmail) {
    res
      .status(409)
      .send({ status: false, message: "email is already register" });
  }
  const user: User = new User();
  user.email = email;
  user.fname = fname;
  user.lname = lname;
  user.password = password;
  const results = await AppDataSource.getRepository(User).save(user);
  return res.status(201).send(results);
});

/* get user detail by id*/
app.get("/notesapp/user/:userid", async function (req: Request, res: Response) {
  const user = await AppDataSource.getRepository(User).findOneBy({
    user_id: Number(req.params.userid),
  });

  if (user) {
    const { fname, lname, email } = user;
    return res.send({ email: email, fname: fname, lname: lname });
  } else {
    return res.send({ status: false, message: "user not found" });
  }
});

/* update user detail by id*/
app.put("/notesapp/user/:id", async function (req: Request, res: Response) {
  const user = await AppDataSource.getRepository(User).findOneBy({
    user_id: Number(req.params.id),
  });

  if (user) {
    const { fname, lname, email, password } = user;
    const updateUser = {
      fname: req.body.fname || fname,
      lname: req.body.lname || lname,
      email: req.body.email || email,
      password: req.body.password || password,
    };

    const updatedUser = await AppDataSource.getRepository(User).update(
      {
        user_id: Number(req.params.id),
      },
      updateUser
    );

    res.send("user data updated");
  } else {
    res.send("user not found");
  }
});

/*delete user and notes by userid*/
app.delete("/notesapp/user/:id", async function (req: Request, res: Response) {
  const ID = req.params.id;
  const deletedNotes = await AppDataSource.getRepository(Note).delete({
    userId: ID,
  });
  const deletedUser = await AppDataSource.getRepository(User).delete({
    user_id: Number(ID),
  });
  res.send("user and notes for that user deleted");
});

/* get all notes for user with ID */
app.get("/notesapp/notes/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(Note).findBy({
    userId: req.params.id,
  });
  console.log(results);
  if (results.length < 1) {
    return res.send({ status: false, message: "notes not found" });
  }
  return res.send({ status: true, data: results });
});

/*add notes for user*/
app.post(
  "/notesapp/notes/:userId",
  async function (req: Request, res: Response) {
    const { note, status } = req.body;

    const createNote: Note = new Note();
    createNote.note = note;
    createNote.status = status;
    createNote.userId = req.params.userId;
    createNote.isdeleted = false;

    const results = await AppDataSource.getRepository(Note).save(createNote);

    return res.send(results);
  }
);

/*delete notes for user*/
app.delete(
  "/notesapp/notes/:notesId",
  async function (req: Request, res: Response) {
    const deletedNotes = await AppDataSource.getRepository(Note).delete({
      note_id: parseInt(req.params.notesId),
    });
    res.send(deletedNotes);
  }
);

function main() {
  app.listen(port, () => {
    console.log(`App listening http://localhost:${port}`);
  });
}

main();
