import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Company, User, RecipesIngredients, OrdersIngredients } from "./index";

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
  // unity!: "GR" | "U"

  @Column()
  price!: number;

  // @ManyToOne(() => Company, company => company.ingredients)
  // company!: Company;

  // @ManyToOne(() => User, user => user.ingredients)
  // owner!: User;

  // @OneToMany(() => RecipesIngredients, recipesIngredients => recipesIngredients.ingredient)
  // recipesIngredients!: RecipesIngredients[];

  // @OneToMany(() => OrdersIngredients, ordersIngredients => ordersIngredients.ingredient)
  // orderIngredients!: OrderIngredients[];
}
