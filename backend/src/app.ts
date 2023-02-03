const express = require("express");
import { Request, Response } from "express";
import { AppDataSource } from "./database/datasource";
import { Note } from "./database/entity/note.entity";
import { User } from "./database/entity/user.entity";
import bodyParser from "body-parser";
import { getGoogleAuthURL, getTokens } from "./oauth/oauth";
const cors = require("cors");
const app = express();
app.use(cors());
import {
  REDIRECT_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URI,
  COOKIE_NAME,
  UI_ROOT_URI,
  JWT_SECRET,
} from "./config";
import axios from "axios";
const jwt = require("jsonwebtoken");

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const port = 4000;
app.use(bodyParser.json());

/* generates url for google login */
app.get("/notesapp/auth/google/url", (req: Request, res: Response) => {
  return res.send(getGoogleAuthURL());
});

/* logging in google user if not present in database new user will be created */
app.get(`/${REDIRECT_URI}`, async (req: any, res: any) => {
  const code = req.query.code;

  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
  });

  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });

  const { name, email } = googleUser;
  const userExists = await AppDataSource.getRepository(User).findOneBy({
    email: email,
  });

  if (!userExists) {
    const nameArray = name.split(" ");
    const user: User = new User();
    user.email = email;
    user.fname = nameArray[0];
    user.lname = nameArray[1];
    user.password = "temppassword"; //used for temprary user creation with password later reset link will be send to user
    const results = await AppDataSource.getRepository(User).save(user);

    const token = jwt.sign(results.user_id, JWT_SECRET);
    return res.send(token);
  }

  const token = jwt.sign(userExists.user_id, JWT_SECRET);
  return res.send(token);
});

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

/*user login*/
app.get("/notesapp/login", async function (req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email) {
    return res.send("enter your email");
  }

  if (!password) {
    return res.send("enter your password");
  }

  const user = await AppDataSource.getRepository(User).findOneBy({
    email: email,
  });

  if (!user) {
    return res.send("wrong email");
  }

  if (user.password != password) {
    return res.send("wrong password");
  }

  const token = jwt.sign(user.user_id, JWT_SECRET);
  return res.send(token);
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
