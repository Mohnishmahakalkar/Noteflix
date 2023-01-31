import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "./entity/note.entity";
import { User } from "./entity/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 6500,
  username: "admin",
  password: "admin",
  database: "notes_app",
  synchronize: true,
  entities: [User, Note],
});
