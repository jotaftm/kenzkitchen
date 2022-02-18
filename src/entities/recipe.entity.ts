import {
  BeforeInsert,
  BeforeUpdate,
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

  @ManyToOne(() => User, (user) => user.recipes)
  owner!: User;

  @ManyToOne(() => Company, (company) => company.recipes)
  company!: Company;

  @OneToMany(
    () => RecipeIngredient,
    (recipesIngredients) => recipesIngredients.recipe
  )
  recipesIngredients!: RecipeIngredient[];

  @OneToMany(() => OrderRecipe, (orderRecipe) => orderRecipe.recipe)
  ordersRecipes!: OrderRecipe[];

  // @BeforeUpdate()
  // async calculateCost() {
  //   console.log("chamou");
  //   this.cost =
  //     this.recipesIngredients.reduce((acc, cVal) => {
  //       return acc + cVal.quantity * cVal.ingredient.price;
  //     }, 0) / this.yield;
  // }
}
