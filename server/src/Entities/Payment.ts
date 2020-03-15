import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToOne
} from "typeorm"
import { ObjectType, Field, Int, ID, createUnionType } from "type-graphql"

import Order from "@Entities/Order"
import ExtendedEntity from "@Contracts/ExtendedEntity"
import Pagination from "@Contracts/Pagination"

enum PaymentType {
  FREE = 0,
  CREDIT_CARD = 1,
  MONEY = 2
}

export const PaginatedPayments = createUnionType({
  name: "payments",
  types: () => [Pagination, Payment]
})

@ObjectType("payment")
@Entity("payments")
export default class Payment extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Int)
  @Column()
  payment_type!: PaymentType.MONEY

  @Field(() => Order)
  @OneToOne(() => Order)
  order!: Order

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
