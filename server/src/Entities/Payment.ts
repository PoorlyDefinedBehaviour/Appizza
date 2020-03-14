import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  Entity,
  OneToOne
} from "typeorm"
import { ObjectType, Field, Int, ID } from "type-graphql"
import CreditCard from "@Entities/CreditCard"
import Order from "@Entities/Order"
import ExtendedEntity from "@Contracts/ExtendedEntity"

enum PaymentType {
  FREE = 0,
  CREDIT_CARD = 1,
  MONEY = 2
}

@ObjectType("payment")
@Entity("payments")
export default class Payment extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Int)
  @Column()
  payment_type!: PaymentType.MONEY

  @OneToMany(
    () => CreditCard,
    (card) => card.payments
  )
  credit_card: CreditCard

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
