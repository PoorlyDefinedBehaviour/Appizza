import { Field } from "type-graphql"
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from "typeorm"
import User from "./User.entity"

enum TokenType {
  AUTH = 0
}

export default class Token extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => String)
  @Column()
  value!: string

  @ManyToOne(
    () => User,
    (user) => user.tokens
  )
  @Column()
  user!: User

  @Column({ default: TokenType.AUTH })
  type!: TokenType

  @Column({ default: false })
  is_revoked!: boolean

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
