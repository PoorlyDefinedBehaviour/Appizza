import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Query,
  Ctx
} from "type-graphql"
import Payment, { PaginatedPayments } from "@Entities/Payment"
import PaymentInput from "@Inputs/Payment/PaymentInput"
import Authenticated from "@Middlewares/Authenticated"
import Order, { OrderStatus } from "@Entities/Order"
import PaginationInput from "@Inputs/Pagination/PaginationInput"
import HasRole from "@Middlewares/HasRole"

@Resolver(() => Payment)
export default class PaymentResolver {
  @Mutation(() => Payment)
  @UseMiddleware(Authenticated)
  async makePayment(@Arg("data") data: PaymentInput) {
    const payment = Payment.create(data)

    const order = await Order.findOneOrFail(data.order)

    order.status = OrderStatus.PAID

    await order.save()

    payment.order = order

    return payment.save()
  }

  @Query(() => [PaginatedPayments])
  @UseMiddleware(Authenticated)
  getMyPayments(
    @Arg("pagination") { skip, take }: PaginationInput,
    @Ctx() { auth }
  ) {
    return Payment.paginate(skip, take, { where: { user: auth.user } })
  }

  @Query(() => [PaginatedPayments])
  @UseMiddleware(Authenticated, HasRole("administrator"))
  getAllPayments(@Arg("pagination") { skip, take }: PaginationInput) {
    return Payment.paginate(skip, take)
  }
}
