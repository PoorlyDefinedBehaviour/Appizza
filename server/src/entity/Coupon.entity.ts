import { Field, Int, ObjectType } from "type-graphql"
import {
  BaseEntity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn
} from "typeorm"
import Product from "./Product.entity"

@ObjectType()
export default class Coupon extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => String)
  @Column({ unique: true })
  code!: string

  @Field(() => Int)
  @Column()
  discount!: number

  @Field(() => Date)
  @Column()
  valid_from!: Date

  @Field(() => Date)
  @Column()
  valid_until!: Date

  @Field(() => [Product])
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
