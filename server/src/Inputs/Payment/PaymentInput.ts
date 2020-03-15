import { InputType, Int, Field, ID } from "type-graphql"
import { IsNotEmpty, IsInt, IsIn } from "class-validator"
import Exists from "@Validators/Exists"
import Order from "@Entities/Order"

@InputType()
export default class PaymentInput {
  @IsNotEmpty({
    message: "payment_type type must be one of [free=0, credit_card=1, money=2]"
  })
  @IsInt({ message: "payment_type must be a number" })
  @IsIn([1, 2, 3], {
    message: "payment_type type must be one of [free=0, credit_card=1, money=2]"
  })
  @Field(() => Int)
  payment_type!: number

  @IsNotEmpty({
    message: "order is required and must be the id of an existent order"
  })
  @Exists({ field: "id", repository: Order })
  @Field(() => ID)
  order!: Order
}
