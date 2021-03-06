import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Recipe from "./recipe.entity";
import Ingredient from "./ingredient.entity";

@Entity("recipesIngredients")
export default class RecipeIngredient {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  quantity!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipesIngredients, {
    onDelete: "CASCADE",
    eager: true,
  })
  recipe!: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipesIngredients, {
    onDelete: "CASCADE",
    eager: true,
  })
  ingredient!: Ingredient;
}
