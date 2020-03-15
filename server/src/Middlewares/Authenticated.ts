import { TokenType } from "@Entities/Token"
import { ResolverData, NextFn, UnauthorizedError } from "type-graphql"
import Token from "@Entities/Token"

export default class Authenticated {
  async use({ context }: ResolverData<any>, next: NextFn) {
    const token = await Token.findOne(
      {
        value: context.req.headers.authorization,
        type: TokenType.AUTH,
        is_revoked: false
      },
      { relations: ["user"] }
    )

    if (!token?.user) {
      throw new UnauthorizedError()
    }

    context.auth.user = token.user

    return next()
  }
}
