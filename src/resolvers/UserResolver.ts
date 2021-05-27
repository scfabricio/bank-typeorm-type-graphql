import { Arg, Field, InputType, Mutation, Resolver, Query, Authorized, Ctx } from "type-graphql";
import { getRepository } from "typeorm";

import User from "../model/User";
import { Context } from "../types/context";
import { getPayload } from "../model/Auth";

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

  @Authorized("ADMIN")
  @Query(() => [User])
  async usuarios(@Ctx() ctx: Context) {
    const payload = getPayload(ctx);

    console.log(payload)

    const repository = getRepository(User);
    const usuarios = await repository.find();
    return usuarios;
  }
}