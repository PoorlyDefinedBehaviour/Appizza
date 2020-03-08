import { Field } from "type-graphql"
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm"
import Payment from "@Entities/Payment"

@Entity("credit_card")
export default class CreditCard extends BaseEntity {
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
