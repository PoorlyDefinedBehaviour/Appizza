import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Ctx,
  UseMiddleware
} from "type-graphql"
import User from "@Entities/User"
import RegisterInput from "@Inputs/User/RegisterInput"
import LoginInput from "@Inputs/User/LoginInput"
import Authenticated from "@Middlewares/Authenticated"

@Resolver(() => User)
export default class UserResolver {
  @Mutation(() => User)
  async registerUser(@Arg("user") data: RegisterInput) {
    const user = await User.create(data).save()

    return user
  }

  @Mutation(() => String)
  async login(@Arg("user") data: LoginInput, @Ctx() { auth }) {
    const token = await auth.loginJWT(data)

    return token
  }

  @UseMiddleware(Authenticated)
  @Mutation(() => Boolean)
  async logout(@Ctx() { auth }) {
    await auth.logout()

    return true
  }

  @UseMiddleware(Authenticated)
  @Query(() => User)
  async me(@Ctx() { auth }) {
    return auth.user
  }
}
