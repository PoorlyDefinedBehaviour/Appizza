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
  registerUser(@Arg("data") data: RegisterInput) {
    return User.create(data).save()
  }

  @Mutation(() => String)
  login(@Arg("data") data: LoginInput, @Ctx() { auth }) {
    return auth.loginJWT(data)
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
