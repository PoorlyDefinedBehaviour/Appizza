import {
  Resolver,
  Mutation,
  Arg,
  Query,
  UseMiddleware,
  Int
} from "type-graphql"
import ProductInput from "@Inputs/Product/ProductInput"
import Authenticated from "@Middlewares/Authenticated"
import HasRole from "@Middlewares/HasRole"
import Product, { PaginatedProducts } from "@Entities/Product"
import PaginationInput from "@Inputs/Pagination/PaginationInput"
import { Like } from "typeorm"

@Resolver(() => Product)
export default class ProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  createProduct(@Arg("data") data: ProductInput) {
    return Product.create(data).save()
  }

  @Mutation(() => Product)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async updateProduct(@Arg("id") id: string, @Arg("data") data: ProductInput) {
    const product = await Product.findOneOrFail({ where: { id } })

    return Product.merge(product, data).save()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async deleteProduct(@Arg("id") id: string) {
    await Product.delete(id)

    return true
  }

  @Query(() => [PaginatedProducts])
  getProducts(@Arg("pagination") { skip, take }: PaginationInput) {
    return Product.paginate(skip, take)
  }

  @Query(() => [PaginatedProducts])
  async getProductsByCategories(
    @Arg("pagination") { skip, take }: PaginationInput,
    @Arg("categories", () => [Int]) categories: number[]
  ) {
    const [products, count] = await Product.createQueryBuilder("product")
      .innerJoin("categories", "category", "category.id IN (:categories)", {
        categories
      })
      .getManyAndCount()

    return Product.toPaginated(products, { skip, take, count })
  }

  @Query(() => [PaginatedProducts])
  getProductsByTitle(
    @Arg("pagination") { skip, take }: PaginationInput,
    @Arg("title") title: string
  ) {
    return Product.paginate(skip, take, {
      where: { title: Like(`%${title}%`) }
    })
  }

  @Query(() => PaginatedProducts, { nullable: true })
  getProductById(@Arg("id") id: number) {
    return Product.findOne({ where: { id } })
  }
}
