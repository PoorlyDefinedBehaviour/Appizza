import { Field } from "type-graphql"
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm"
import Payment from "@Entities/Payment"
import ExtendedEntity from "@Contracts/ExtendedEntity"

@Entity("credit_cards")
export default class CreditCard extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
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
