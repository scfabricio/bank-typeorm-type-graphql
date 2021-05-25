import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  email: String;

  @Column()
  password: String;
}

export default User;