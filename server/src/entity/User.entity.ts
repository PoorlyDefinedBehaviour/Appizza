import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  OneToMany,
  ManyToMany
} from "typeorm"
import { ObjectType, Field } from "type-graphql"
import { hash, compare } from "bcryptjs"
import Order from "./Order.entity"
import Token from "./Token.entity"
import Role from "./Role.entity"

@ObjectType()
export default class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Field(() => String)
  @Column()
  first_name!: string

  @Field(() => String)
  @Column()
  last_name!: string

  @Field(() => String)
  @Column()
  email!: string

  @Field(() => String)
  @Column()
  phone!: string

  @Column()
  password!: string

  @Column()
  temp_password!: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at!: Date

  @Field(() => [Order])
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
  private loadTempPassword(): void {
    this.temp_password = this.password
  }

  @BeforeInsert()
  async hashPassword(password: string): Promise<void> {
    const SALT_ROUNDS = 10
    this.password = await hash(password, SALT_ROUNDS)
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate(): Promise<void> {
    if (this.temp_password !== this.password) {
      await this.hashPassword(this.password)
    }
  }

  async isPasswordCorrect(password: string): Promise<boolean> {
    const correct = await compare(password, this.password)
    return correct
  }
}
