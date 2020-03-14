import { Resolver, Arg, Mutation, Ctx, UseMiddleware } from "type-graphql"
import { Queue } from "bullmq"
import Authenticated from "@Middlewares/Authenticated"
import Token, { TokenType } from "@Entities/Token"
import User from "@Entities/User"

const resetPasswordEmailQueue = new Queue("reset_password_email")

@Resolver(() => String)
export default class PasswordResetResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(Authenticated)
  async sendPasswordResetEmail(
    @Arg("email") email: string,
    @Ctx() { request, auth }
  ) {
    const token = await Token.forType(auth.user, TokenType.PASSWORD_RESET)

    resetPasswordEmailQueue.add("send_reset_password_email", {
      data: {
        to: email,
        link: `http://${request.headers.host}/reset_password/${token}`
      }
    })
  }

  @Mutation(() => User)
  async changePassword(
    @Arg("token") tokenValue,
    @Arg("password") password: string
  ) {
    const token = await Token.findOneOrFail({
      relations: ["user"],
      where: { value: tokenValue, type: TokenType.PASSWORD_RESET }
    })

    const user = await User.merge(token.user, { password }).save()

    await token.invalidate()

    return user
  }
}
