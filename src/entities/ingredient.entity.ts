import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user.entity";
import Company from "./company.entity";
import RecipeIngredient from "./recipesIngredients.entity";
import OrderIngredient from "./ordersIngredients.entity";

@Entity("ingredients")
export default class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  barCode!: string;

  @Column()
  description!: string;

  @Column()
  quantity!: number;

  @Column()
  unity!: string;

  @Column({ type: "float" })
  price!: number;

  @ManyToOne(() => Company, (company) => company.ingredients, {
    onDelete: "CASCADE",
  })
  company!: Company;

  @ManyToOne(() => User, (user) => user.ingredients, { onDelete: "CASCADE" })
  owner!: User;

  @OneToMany(
    () => RecipeIngredient,
    (recipesIngredients) => recipesIngredients.ingredient
  )
  recipesIngredients!: RecipeIngredient[];

  @OneToMany(
    () => OrderIngredient,
    (ordersIngredients) => ordersIngredients.ingredient
  )
  ordersIngredients!: OrderIngredient[];
}
