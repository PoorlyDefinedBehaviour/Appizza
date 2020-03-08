import {
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  Index
} from "typeorm"
import User from "./User.entity"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export default class Role extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => String)
  @Column()
  title!: string

  @Field(() => String)
  @Column({ unique: true })
  @Index()
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
