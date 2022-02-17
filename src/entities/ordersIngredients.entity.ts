import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./order.entity";
import Ingredient from "./ingredient.entity";

@Entity("ordersIngredients")
export default class OrderIngredient {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(() => Order, (order) => order.ordersIngredients)
  order!: Order;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.ordersIngredients)
  ingredient!: Ingredient;
}
