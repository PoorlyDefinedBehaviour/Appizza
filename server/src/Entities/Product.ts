import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity
} from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"

import Coupon from "@Entities/Coupon"
import Order from "@Entities/Order"
import Category from "@Entities/Category"

@ObjectType("product")
@Entity("product")
export default class Product extends BaseEntity {
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
    (category) => category.products
  )
  categories: Category[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
