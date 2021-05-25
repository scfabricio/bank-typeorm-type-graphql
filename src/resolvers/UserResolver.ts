import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getRepository } from "typeorm";

import UserModel from "../model/User";

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
  @Mutation(() => UserModel)
  async createUser(
    @Arg("dados", () => UserCreateInput)
    dados: UserCreateInput
  ) {

    const repository = getRepository(UserModel);
    const result = await repository.insert({ ...dados });

    return {
      id: result.raw,
      ...dados
    };
  }
}