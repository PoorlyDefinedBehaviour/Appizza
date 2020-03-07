import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany
} from "typeorm"
import { ObjectType, Field, Int } from "type-graphql"
import Order from "./Order.entity"
import CreditCard from "./CreditCard.entity"

enum PaymentType {
  FREE = 0,
  CREDIT_CARD = 1,
  MONEY = 2
}

@ObjectType()
export default class Payment extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => Int)
  @Column()
  payment_type!: PaymentType.MONEY

  @OneToMany(
    () => CreditCard,
    (card) => card.payments
  )
  credit_card: CreditCard

  @Field(() => Order)
  @Column()
  order!: Order

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
