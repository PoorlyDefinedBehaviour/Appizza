import {
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Entity
} from "typeorm"
import { Field, ObjectType, Int, ID } from "type-graphql"
import User from "@Entities/User"
import Product from "@Entities/Product"
import ExtendedEntity from "@Contracts/ExtendedEntity"

enum OrderStatus {
  PENDING = 0,
  CANCELED = 1,
  DELIVERED = 2
}

@ObjectType("order")
@Entity("orders")
export default class Order extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Int)
  @Column({
    default: OrderStatus.PENDING
  })
  status!: OrderStatus

  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.orders,
    { cascade: true }
  )
  user: User

  @Field(() => [Product])
  @ManyToMany(
    () => Product,
    (product) => product.orders
  )
  products: Product[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
