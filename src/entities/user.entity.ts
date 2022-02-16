import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Company from "./company.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: false })
  isManager!: boolean;

  @ManyToOne(() => Company, (company) => company.users)
  company!: Company;

  //   @OneToMany(() => Order, order.user)
  //   orders!: Order[];

  //   @OneToMany(() => Ingredient, ingredient.user)
  //   ingredients!: Ingredient[];

  //   @OneToMany(() => Recipe, recipe.user)
  //   recipes!: Recipe[];
}
