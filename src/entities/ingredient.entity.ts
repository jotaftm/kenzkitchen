import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Company from "./company.entity";
import RecipeIngredient from "./recipesIngredients.entity";

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
  // unity!: "GR" | "UN"

  @Column()
  price!: number;

  @ManyToOne(() => Company, (company) => company.ingredients)
  company!: Company;

  // @ManyToOne(() => User, user => user.ingredients)
  // owner!: User;

  @OneToMany(
    () => RecipeIngredient,
    (recipesIngredients) => recipesIngredients.ingredient
  )
  recipesIngredients!: RecipeIngredient[];

  // @OneToMany(() => OrderIngredient, ordersIngredients => ordersIngredients.ingredient)
  // ordersIngredients!: OrderIngredient[];
}
