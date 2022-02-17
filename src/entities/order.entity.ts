import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import User from "./user.entity";
import Company from "./company.entity";
import Recipe from "./recipe.entity";
import Ingredient from "./ingredient.entity";
import OrderIngredient from "./ordersIngredients.entity";
import OrderRecipe from "./ordersRecipes.entity";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: false })
  isExecuted!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  scheduled!: Date;

  @ManyToOne(() => User, (user) => user.orders)
  owner!: User;

  @ManyToOne(() => Company, (company) => company.orders)
  company!: Company;

  @OneToMany(
    () => OrderIngredient,
    (ordersIngredients) => ordersIngredients.order
  )
  ordersIngredients!: OrderIngredient[];

  @OneToMany(() => OrderRecipe, (ordersRecipes) => ordersRecipes.order)
  ordersRecipes!: OrderRecipe[];
}
