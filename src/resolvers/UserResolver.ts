import { Arg, Field, InputType, Mutation, Resolver, Query } from "type-graphql";
import { getRepository } from "typeorm";

import User from "../model/User";

@InputType()
class UserCreateInput {
  @Field()
  name: String;

  @Field()
  email: String;

  @Field()
  password: String;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("dados", () => UserCreateInput)
    dados: UserCreateInput
  ) {

    const repository = getRepository(User);
    const result = await repository.insert({ ...dados });

    return { ...dados, id: result.raw };
  }

  @Query(() => [User])
  async usuarios() {
    const repository = getRepository(User);
    const usuarios = await repository.find();
    return usuarios;
  }
}