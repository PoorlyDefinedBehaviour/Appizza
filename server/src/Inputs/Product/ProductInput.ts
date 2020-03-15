import { InputType, Field, Int } from "type-graphql"

import { IsNotEmpty, IsString, IsArray, IsNumberString } from "class-validator"
import Category from "@Entities/Category"

@InputType()
export default class ProductInput {
  @IsNotEmpty({ message: "A title is required" })
  @IsString({ message: "The title must be a string" })
  @Field(() => String)
  title!: string

  @IsNotEmpty({ message: "A description is required" })
  @IsString({ message: "The description must be a string" })
  @Field(() => String)
  description!: string

  @IsNotEmpty({ message: "A price is required" })
  @IsNumberString({ message: "Price must be a number string" })
  @Field(() => String)
  price!: string

  @Field(() => [Int], { nullable: true })
  @IsArray({ message: "Categories must be an array of category ids" })
  categories: Category[]
}
