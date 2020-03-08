import User from "@Entities/User"
import Token from "@Entities/Token"
import LoginInput from "@Inputs/User/LoginInput"
import { UnauthorizedError, ResolverData, NextFn } from "type-graphql"

export default class Auth {
  private user: User

  private async loginJWT(data: LoginInput): Promise<string> {
    const user = await User.findOneOrFail({ email: data.email })

    const isCorrectPassword = await user.isCorrectPassword(data.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedError()
    }

    const token = await Token.createJWT(user)

    user.tokens = user.tokens ? user.tokens.concat(token) : [token]

    await user.save()

    this.user = user

    return token.value
  }

  private getUser(): User {
    return this.user
  }

  async use({ context }: ResolverData<any>, next: NextFn) {
    context.auth = {
      user: this.user,
      loginJWT: this.loginJWT.bind(this),
      getUser: this.getUser.bind(this)
    }

    console.log("context", context)
    if (!this.user) {
    }

    return next()
  }
}
