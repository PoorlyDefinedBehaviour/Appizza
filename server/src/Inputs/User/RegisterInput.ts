import User from "@Entities/User"
import { InputType, Field } from "type-graphql"
import Unique from "@Validators/Unique"
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsNumberString,
  IsBoolean
} from "class-validator"

@InputType()
export default class RegisterInput {
  @IsNotEmpty({ message: "A first name is required" })
  @MaxLength(255, { message: "First name can't be longer than 255 characters" })
  @Field(() => String, { nullable: false })
  first_name!: string

  @IsNotEmpty({ message: "A last name is required" })
  @MaxLength(255, { message: "Last name can't be longer than 255 characters" })
  @Field(() => String, { nullable: false })
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

  @IsBoolean()
  @Field(() => Boolean, { nullable: false })
  receive_notifications!: boolean

  @MinLength(6, { message: "Password needs to be at least 6 characters long" })
  @MaxLength(255, { message: "Password can't be longer than 255 characters" })
  @Field(() => String, { nullable: false })
  password!: string

  @IsNotEmpty({ message: "A phone number is required" })
  @MaxLength(11, { message: "Phone number must have 11 numbers" })
  @IsNumberString({ message: "A phone number can only contain numbers" })
  @Field(() => String, { nullable: false })
  phone!: string
}
