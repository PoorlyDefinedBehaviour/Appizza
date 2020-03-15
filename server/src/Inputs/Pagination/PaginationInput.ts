import { InputType, Field, Int } from "type-graphql"

@InputType()
export default class PaginationInput {
  @Field(() => Int)
  skip: number

  @Field(() => Int)
  take: number
}
