import { Field, ObjectType, ID, createUnionType } from "type-graphql"
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  Entity,
  JoinTable
} from "typeorm"
import Product from "@Entities/Product"
import ExtendedEntity from "@Contracts/ExtendedEntity"
import Pagination from "@Contracts/Pagination"

export const PaginatedCategories = createUnionType({
  name: "categories",
  types: () => [Pagination, Category]
})

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

  @Field(() => [Product], { defaultValue: [] })
  @JoinTable()
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
