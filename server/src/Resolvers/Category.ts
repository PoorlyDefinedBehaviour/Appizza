import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql"

import Authenticated from "@Middlewares/Authenticated"
import Category from "@Entities/Category"
import HasRole from "@Middlewares/HasRole"
import CategoryInput from "@Inputs/Category/CategoryInput"
import { PaginatedCategories } from "@Entities/Category"
import PaginationInput from "@Inputs/Pagination/PaginationInput"

@Resolver(() => Category)
export default class CategoryResolver {
  @Mutation(() => Category)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  createCategory(@Arg("data") data: CategoryInput) {
    return Category.create(data).save()
  }

  @Mutation(() => Category)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async updateCategory(
    @Arg("id") id: number,
    @Arg("data") data: CategoryInput
  ) {
    const category = await Category.findOneOrFail({ where: { id } })

    return Category.merge(category, data).save()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async deleteCategory(@Arg("id") id: number) {
    const { affected } = await Category.delete(id)

    return affected === 1
  }

  @Query(() => [PaginatedCategories])
  @UseMiddleware(Authenticated)
  getAllCategories(@Arg("pagination") { skip, take }: PaginationInput) {
    return Category.paginate(skip, take)
  }
}
