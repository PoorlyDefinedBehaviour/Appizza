import { Field, ObjectType, Int } from "type-graphql"

export interface PaginationData {
  skip: number
  take: number
  count: number
  has_next: boolean
}

@ObjectType("pagination")
export default class Pagination {
  constructor(data: PaginationData) {
    this.skip = data.skip
    this.take = data.take
    this.count = data.count
    this.has_next = data.has_next
  }

  @Field(() => Boolean)
  has_next: boolean

  @Field(() => Int)
  skip: number

  @Field(() => Int)
  take: number

  @Field(() => Int)
  count: number
}
