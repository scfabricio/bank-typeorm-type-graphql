import { Query, Resolver } from "type-graphql";

@Resolver()
export class AccountResolver {
  @Query(() => String)
  account() {
    return "hi";
  }
}