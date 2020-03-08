import User from "@Entities/User"
import { InputType, Field } from "type-graphql"
import Unique from "@Validators/Unique"
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsNumberString
} from "class-validator"

@InputType()
export default class UserInput {
  @IsNotEmpty({ message: "A first name is required" })
  @MaxLength(255, { message: "First name can't be longer than 255 characters" })
  @Field(() => String)
  first_name!: string

  @IsNotEmpty({ message: "A last name is required" })
  @MaxLength(255, { message: "Last name can't be longer than 255 characters" })
  @Field(() => String)
  last_name!: string

  @IsNotEmpty({ message: "An email is required" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @MaxLength(255, { message: "Email can't be longer than 255 characters" })
  @Unique(
    { field: "email", repository: User },
    { message: "Email is already in use" }
  )
  @Field(() => String, { nullable: false })
  email!: string

  @MinLength(6, { message: "Password needs to be at least 6 characters long" })
  @MaxLength(255, { message: "Password can't be longer than 255 characters" })
  @Field(() => String)
  password!: string

  @MaxLength(11, { message: "Phone number must have 11 numbers" })
  @IsNotEmpty({ message: "A phone number is required" })
  @IsNumberString({ message: "A phone number can only contain numbers" })
  @Field(() => String)
  phone!: string
}
