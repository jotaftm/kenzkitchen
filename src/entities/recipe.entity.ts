import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Company from "./company.entity";
import RecipeIngredient from "./recipesIngredients.entity";
import User from "./user.entity";
import OrderRecipe from "./ordersRecipes.entity";

@Entity("recipes")
export default class Recipe {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column()
  yield!: number;

  @Column()
  unity!: string;

  @Column({ type: "float", default: 0 })
  cost!: number;

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: "CASCADE" })
  owner!: User;

  @ManyToOne(() => Company, (company) => company.recipes, {
    onDelete: "CASCADE",
  })
  company!: Company;

  @OneToMany(
    () => RecipeIngredient,
    (recipesIngredients) => recipesIngredients.recipe
  )
  recipesIngredients!: RecipeIngredient[];

  @OneToMany(() => OrderRecipe, (orderRecipe) => orderRecipe.recipe)
  ordersRecipes!: OrderRecipe[];
}
