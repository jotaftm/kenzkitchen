import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./user.entity";
import Recipe from "./recipe.entity";
import Ingredient from "./ingredient.entity";
import Order from "./order.entity";

@Entity("companies")
export default class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cnpj!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  createdBy!: string;

  @OneToMany(() => User, (user) => user.company)
  users!: User[];

  @OneToMany(() => Recipe, (recipe) => recipe.company)
  recipes!: Recipe[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.company)
  ingredients!: Ingredient[];

  @OneToMany(() => Order, (order) => order.company)
  orders!: Order[];
}
