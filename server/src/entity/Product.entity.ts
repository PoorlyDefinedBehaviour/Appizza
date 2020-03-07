import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"
import { Field, ObjectType } from "type-graphql"
import Coupon from "./Coupon.entity"
import Order from "./Order.entity"
import Category from "./Category.entity"

@ObjectType()
export default class Product extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  description!: string

  @Field(() => String)
  @Column()
  price!: string

  @Field(() => [Order])
  @ManyToMany(
    () => Order,
    (order) => order.products
  )
  orders: Order[]

  @Field(() => [Coupon])
  @ManyToMany(
    () => Coupon,
    (coupon) => coupon.products
  )
  coupons: Coupon[]

  @Field(() => [Category])
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
