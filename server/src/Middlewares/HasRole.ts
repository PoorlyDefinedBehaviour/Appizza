import { ResolverData, NextFn, UnauthorizedError } from "type-graphql"
import Role from "@Entities/Role"

const HasRole = (role: string) =>
  class {
    async use({ context }: ResolverData<any>, next: NextFn) {
      const roles = await Role.find({ where: { userId: context.auth.user.id } })

      if (!roles.some(({ slug }) => slug === role)) {
        throw new UnauthorizedError()
      }

      return next()
    }
  }

export default HasRole
