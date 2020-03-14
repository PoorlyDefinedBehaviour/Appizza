import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql"

import Authenticated from "@Middlewares/Authenticated"
import Coupon from "@Entities/Coupon"
import HasRole from "@Middlewares/HasRole"
import CouponInput from "@Inputs/Coupon/CouponInput"
import PaginationInput from "@Inputs/Pagination/PaginationInput"
import { PaginatedCoupons } from "@Entities/Coupon"

@Resolver(() => Coupon)
export default class UserResolver {
  @Mutation(() => Coupon)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  createCoupon(@Arg("data") data: CouponInput) {
    return Coupon.create(data).save()
  }

  @Mutation(() => Coupon)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async deleteCoupon(@Arg("id") id: number) {
    const { affected } = await Coupon.delete(id)

    return affected === 1
  }

  @Query(() => [PaginatedCoupons])
  @UseMiddleware(Authenticated, HasRole("administrator"))
  getAllCoupons(@Arg("pagination") { skip, take }: PaginationInput) {
    return Coupon.paginate(skip, take)
  }
}
