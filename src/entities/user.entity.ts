import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  isAdm!: boolean;

  //   @ManyToOne(() => Company, company => company.users, { onDelete: 'CASCADE', cascade: true})
  //   company!: Company;

  //   @OneToMany(() => Order, order.user)
  //   orders!: Order[];

  //   @OneToMany(() => Ingredient, ingredient.user)
  //   ingredients!: Ingredient[];

  //   @OneToMany(() => Recipe, recipe.user)
  //   recipes!: Recipe[];
}
