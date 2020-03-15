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
import Category from "@Entities/Category"

@Resolver(() => Product)
export default class ProductResolver {
  @Mutation(() => Product)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async createProduct(@Arg("data") data: ProductInput) {
    const product = Product.create(data)

    product.categories = await Category.findByIds(data.categories)

    return product.save()
  }

  @Mutation(() => Product)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async updateProduct(@Arg("id") id: string, @Arg("data") data: ProductInput) {
    const product = await Product.findOneOrFail({ where: { id } })

    return Product.merge(product, data).save()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticated, HasRole("administrator"))
  async deleteProduct(@Arg("id") id: number) {
    const { affected } = await Product.delete(id)

    return affected === 1
  }

  @Query(() => [PaginatedProducts])
  @UseMiddleware(Authenticated)
  getProducts(@Arg("pagination") { skip, take }: PaginationInput) {
    return Product.paginate(skip, take)
  }

  @Query(() => [PaginatedProducts])
  @UseMiddleware(Authenticated)
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
  @UseMiddleware(Authenticated)
  getProductsByTitle(
    @Arg("pagination") { skip, take }: PaginationInput,
    @Arg("title") title: string
  ) {
    return Product.paginate(skip, take, {
      where: { title: Like(`%${title}%`) }
    })
  }

  @Query(() => Product, { nullable: true })
  @UseMiddleware(Authenticated)
  getProductById(@Arg("id") id: number) {
    return Product.findOne({ where: { id } })
  }
}
