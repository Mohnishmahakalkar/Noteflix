import { Note } from './note.entity';
import {
    Column,
    Entity,
    JoinTable,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm"

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    user_id: number
  
    @Column()
    fname: string
  
    @Column()
    lname: string

    @Column()
    email : string

    @Column()
    password : string
   
  }