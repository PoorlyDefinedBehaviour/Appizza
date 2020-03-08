import User from "@Entities/User"
import Token from "@Entities/Token"
import LoginInput from "@Inputs/User/LoginInput"
import { UnauthorizedError, ResolverData, NextFn } from "type-graphql"

export default class Auth {
  private async loginJWT(data: LoginInput): Promise<string> {
    const user = await User.findOneOrFail({ email: data.email })

    const isCorrectPassword = await user.isCorrectPassword(data.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedError()
    }

    const token = await Token.createJWT(user)

    user.tokens = user.tokens ? user.tokens.concat(token) : [token]

    await user.save()

    return token.value
  }

  private logout(user: User) {
    return Token.delete({ user })
  }

  async use({ context }: ResolverData<any>, next: NextFn) {
    context.auth = {
      ...context.auth,
      loginJWT: this.loginJWT.bind(this),
      logout: () => this.logout(context.auth.user)
    }

    return next()
  }
}
