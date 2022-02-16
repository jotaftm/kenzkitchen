import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
// import Company from "./company.entity";
// import User from "./user.entity";
// import RecipesIngredients from "./recipesIngredients.entity";
// import OrdersIngredients from "./ordersIngredients.entity";

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
