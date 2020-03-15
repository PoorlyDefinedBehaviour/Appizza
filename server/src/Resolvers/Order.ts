import {
  Resolver,
  Mutation,
  Arg,
  UseMiddleware,
  Query,
  Ctx,
  Int
} from "type-graphql"

import { PaginatedOrders } from "./../Entities/Order"
import Authenticated from "@Middlewares/Authenticated"
import Order, { OrderStatus } from "@Entities/Order"
import PaginationInput from "@Inputs/Pagination/PaginationInput"
import HasRole from "@Middlewares/HasRole"
import Product from "@Entities/Product"

@Resolver(() => Order)
export default class OrderResolver {
  @Mutation(() => Order)
  @UseMiddleware(Authenticated)
  async createOrder(
    @Arg("products", () => [Int]) products: number[],
    @Ctx() { auth }
  ) {
    const order = Order.create({ user: auth.user })

    order.products = await Product.findByIds(products)

    return order.save()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticated)
  async updateOrderStatus(
    @Arg("order") order: number,
    @Arg("status") status: OrderStatus,
    @Ctx() { auth }
  ) {
    const { affected } = await Order.update(
      { id: order, user: auth.user.id },
      { status }
    )

    return affected
  }

  @Query(() => [PaginatedOrders])
  @UseMiddleware(Authenticated)
  getMyOrders(
    @Arg("pagination") { skip, take }: PaginationInput,
    @Ctx() { auth }
  ) {
    return Order.paginate(skip, take, { where: { user: auth.user.id } })
  }

  @Query(() => [PaginatedOrders])
  @UseMiddleware(Authenticated, HasRole("administrator"))
  getAllOrders(@Arg("pagination") { skip, take }: PaginationInput) {
    return Order.paginate(skip, take)
  }
}
