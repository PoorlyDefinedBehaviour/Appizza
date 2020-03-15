import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity,
  JoinTable
} from "typeorm"
import { Field, ObjectType, ID, createUnionType } from "type-graphql"

import Coupon from "@Entities/Coupon"
import Order from "@Entities/Order"
import Category from "@Entities/Category"
import Pagination from "@Contracts/Pagination"
import ExtendedEntity from "@Contracts/ExtendedEntity"

export const PaginatedProducts = createUnionType({
  name: "products",
  types: () => [Pagination, Product]
})

@ObjectType("product")
@Entity("products")
export default class Product extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  description!: string

  @Field(() => String)
  @Column()
  price!: string

  @Field(() => [Order], { defaultValue: [] })
  @JoinTable()
  @ManyToMany(
    () => Order,
    (order) => order.products
  )
  orders: Order[]

  @Field(() => [Coupon], { defaultValue: [] })
  @ManyToMany(
    () => Coupon,
    (coupon) => coupon.products
  )
  coupons: Coupon[]

  @Field(() => [Category], { defaultValue: [] })
  @ManyToMany(
    () => Category,
    (category) => category.products,
    { cascade: true }
  )
  categories: Category[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
