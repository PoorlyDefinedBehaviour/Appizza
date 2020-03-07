import {
  BaseEntity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from "typeorm"
import { Field, ObjectType, Int } from "type-graphql"
import User from "./User.entity"
import Product from "./Product.entity"

enum OrderStatus {
  PENDING = 0,
  CANCELED = 1,
  DELIVERED = 2
}

@ObjectType()
export default class Order extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => Int)
  @Column({
    default: OrderStatus.PENDING
  })
  status!: OrderStatus

  @Field(() => User)
  @Column()
  @ManyToOne(
    () => User,
    (user) => user.orders
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
