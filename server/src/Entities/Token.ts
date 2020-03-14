import { Field, ID } from "type-graphql"
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import User from "@Entities/User"
import ExtendedEntity from "@Contracts/ExtendedEntity"

export enum TokenType {
  AUTH = 0
}

@Entity("tokens")
export default class Token extends ExtendedEntity {
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

  static async createJWT(user: User): Promise<Token> {
    await Token.delete({ user })

    return Token.create({
      value: jwt.sign(
        {
          userId: (user.id as unknown) as string,
          noise: crypto.randomBytes(16).toString("hex")
        },
        process.env.JWT_SECRET!
      ),
      user
    }).save()
  }
}
