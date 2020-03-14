import { InputType, Field } from "type-graphql"

import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export default class CategoryInput {
  @IsNotEmpty({ message: "A title is required" })
  @IsString({ message: "The title must be a string" })
  @Field(() => String)
  title!: string

  @IsNotEmpty({ message: "A description is required" })
  @IsString({ message: "The description must be a string" })
  @Field(() => String)
  description!: string
}
