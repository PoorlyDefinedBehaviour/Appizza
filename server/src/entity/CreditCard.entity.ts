import { Field } from "type-graphql"
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from "typeorm"
import Payment from "./Payment.entity"

export default class CreditCard extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  number!: string

  @Column()
  security_number!: string

  @ManyToOne(
    () => Payment,
    (payment) => payment.credit_card
  )
  payments: Payment[]

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date
}
