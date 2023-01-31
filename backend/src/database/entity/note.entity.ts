import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  note_id: number;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column()
  isdeleted: boolean;

  @Column({ name: "user_Id" })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_Id" })
  user: User;
}
