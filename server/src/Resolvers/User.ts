import { Resolver, Mutation, Arg, Query } from "type-graphql"
import User from "@Entities/User"
import UserInput from "@Inputs/User/UserInput"

@Resolver(() => User)
export default class UserResolver {
  @Mutation(() => User)
  async registerUser(@Arg("user") data: UserInput) {
    const user = await User.create(data).save()

    return user
  }

  @Query(() => String)
  async uiui(): Promise<string> {
    console.log("aiai uiui")

    return "aiai ui ui"
  }
}
