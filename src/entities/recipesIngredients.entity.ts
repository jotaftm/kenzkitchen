import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Recipe from "./recipe.entity";

@Entity('recipesIngredients')
export default class RecipeIngredient {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    quantity!: number;

    @ManyToOne(() => Recipe, recipe => recipe.recipesIngredients)
    recipe!: Recipe;

    // @ManyToOne(() => Ingredient, ingredient => ingredient.recipesIngredients)
    // ingredient!: Ingredient;
};