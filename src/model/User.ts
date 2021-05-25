import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: Number;

  @Field()
  @Column()
  name: String;

  @Field()
  @Column()
  email: String;

  @Field()
  @Column()
  password: String;
}

export default User;