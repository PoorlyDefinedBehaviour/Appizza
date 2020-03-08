import { Field, ID } from "type-graphql"
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm"
import User from "@Entities/User"

enum TokenType {
  AUTH = 0
}

@Entity("token")
export default class Token extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  value!: string

  @ManyToOne(
    () => User,
    (user) => user.tokens,
    { cascade: true }
  )
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
