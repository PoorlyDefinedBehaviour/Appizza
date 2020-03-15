import { InputType, Field } from "type-graphql"

import { IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export default class LoginInput {
  @IsNotEmpty({ message: "An email is required to login" })
  @IsEmail({}, { message: "Email must be a valid email" })
  @Field(() => String, { nullable: false })
  email!: string

  @IsNotEmpty({ message: "A passoword is required to login" })
  @Field(() => String, { nullable: false })
  password!: string
}
