import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./order.entity";
import Recipe from "./recipe.entity";

@Entity("ordersRecipes")
export default class OrderRecipe {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.ordersRecipes, {
    onDelete: "CASCADE",
  })
  order!: Order;

  @ManyToOne(() => Recipe, (recipe) => recipe.ordersRecipes)
  recipe!: Recipe;
}
