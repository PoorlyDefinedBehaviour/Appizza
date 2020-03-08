import { Resolver } from "type-graphql"
import User from "../entity/User.entity"

@Resolver(() => User)
export default class UserResolver {}
