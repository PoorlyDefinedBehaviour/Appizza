import { Field, Int, ObjectType, ID, createUnionType } from "type-graphql"
import {
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinTable
} from "typeorm"
import Product from "@Entities/Product"
import ExtendedEntity from "@Contracts/ExtendedEntity"
import Pagination from "@Contracts/Pagination"

export const PaginatedCoupons = createUnionType({
  name: "coupons",
  types: () => [Pagination, Coupon]
})

@ObjectType("coupon")
@Entity("coupons")
export default class Coupon extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({ unique: true })
  code!: string

  @Field(() => Int)
  @Column()
  discount_percentage!: number

  @Field(() => Int)
  @Column()
  use_limit!: number

  @Field(() => Date)
  @Column()
  valid_from!: Date

  @Field(() => Date)
  @Column()
  valid_until!: Date

  @Field(() => [Product], { defaultValue: [] })
  @JoinTable()
  @ManyToMany(
    () => Product,
    (product) => product.coupons
  )
  products: Product[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
