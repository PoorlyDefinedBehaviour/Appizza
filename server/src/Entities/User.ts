import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
  ManyToMany,
  BeforeUpdate,
  BeforeInsert,
  Entity,
  JoinTable
} from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"

import { hash, compare } from "bcryptjs"

import Order from "@Entities/Order"
import Token from "@Entities/Token"
import Role from "@Entities/Role"
import ExtendedEntity from "@Contracts/ExtendedEntity"

@ObjectType("user")
@Entity("users")
export default class User extends ExtendedEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  first_name!: string

  @Field(() => String)
  @Column()
  last_name!: string

  @Field(() => String)
  @Column({ unique: true })
  email!: string

  @Field(() => String)
  @Column()
  phone!: string

  @Field(() => Boolean)
  @Column()
  receive_notifications!: boolean

  @Column()
  password!: string

  @Column({ nullable: true })
  temp_password: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date

  @Field(() => [Order])
  @JoinTable()
  @OneToMany(
    () => Order,
    (order) => order.user
  )
  orders: Order[]

  @OneToMany(
    () => Token,
    (token) => token.user
  )
  tokens: Token[]

  @Field(() => [Role])
  @ManyToMany(
    () => Role,
    (role) => role.users
  )
  roles: Role[]

  @AfterLoad()
  // @ts-ignore
  private loadTempPassword(): void {
    this.temp_password = this.password
  }

  private hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = 10
    return hash(password, SALT_ROUNDS)
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await this.hashPassword(this.password)
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate(): Promise<void> {
    if (this.temp_password !== this.password) {
      this.password = await this.hashPassword(this.password)
    }
  }

  isCorrectPassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
