import { Field, ObjectType, ID } from "type-graphql"
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  Entity
} from "typeorm"
import Product from "@Entities/Product"
import ExtendedEntity from "@Contracts/ExtendedEntity"

@ObjectType("category")
@Entity("categories")
export default class Category extends ExtendedEntity {
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
