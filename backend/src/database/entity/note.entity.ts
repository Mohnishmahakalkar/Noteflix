import { Column, Entity, PrimaryGeneratedColumn ,ManyToOne} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  note_id: number

  @Column()
  note:string

  @Column()
  status : string

  @Column()
  isdeleted : boolean

  @ManyToOne(()=> User , (user)=> user.notes)
  user: User
}
