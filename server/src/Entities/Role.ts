import {
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Entity
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

import User from "@Entities/User"

@ObjectType("role")
@Entity("role")
export default class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column({ unique: true })
  slug!: string

  @Field(() => String)
  @Column()
  description!: string

  @Field(() => [User])
  @ManyToMany(
    () => User,
    (user) => user.roles
  )
  users: User[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
