import { InputType, Field, Int } from "type-graphql"
import { IsNotEmpty, IsString, MinLength, IsInt, IsDate } from "class-validator"

@InputType()
export default class CouponInput {
  @IsNotEmpty({ message: "A title is required" })
  @IsString({ message: "The title must be a string" })
  @MinLength(6, { message: "Code length must be at least 6 characters" })
  @Field(() => String)
  code!: string

  @IsNotEmpty({ message: "A discount é required" })
  @IsInt({
    message:
      "Discount must be an integer representing a percentage, example: 30"
  })
  @Field(() => Int)
  discount_percentage!: number

  @IsInt({
    message:
      "use_limit must be an integer representing how many times a coupon can be used by different people"
  })
  @Field(() => Int)
  use_limit!: number

  @Field(() => Date)
  @IsNotEmpty({
    message:
      "valid_from is required, it marks the date from which the code can be used"
  })
  @IsDate({
    message: "valid_from is the date from which the code can be used"
  })
  valid_from!: Date

  @Field(() => Date)
  @IsNotEmpty({
    message:
      "valid_until is required, it marks the date from which the code can't be used anymore"
  })
  @IsDate({
    message: "valid_until is the date from which the code can't be used anymore"
  })
  valid_until!: Date
}
