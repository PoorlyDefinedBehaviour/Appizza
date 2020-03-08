import { Field, ObjectType, ID } from "type-graphql"
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  Entity
} from "typeorm"
import Product from "@Entities/Product"

@ObjectType("category")
@Entity("categories")
export default class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column()
  description!: string

  @ManyToMany(
    () => Product,
    (product) => product.categories
  )
  products: Product[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
