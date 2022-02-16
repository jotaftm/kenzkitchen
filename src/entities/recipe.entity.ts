import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Company from "./company.entity";
import RecipeIngredient from "./recipesIngredients.entity";

@Entity('recipes')
export default class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column()
    description!: string;

    @Column()
    yield!: number;

    @Column()
    unity!: string;
    // unity!: "GR" | "UN";

    @Column()
    cost!: number;

    // @ManyToOne(() => User, user => user.recipes)
    // owner!: User;

    @ManyToOne(() => Company, company => company.recipes)
    company!: Company;

    @OneToMany(() => RecipeIngredient, recipesIngredients => recipesIngredients.recipe)
    recipesIngredients!: RecipeIngredient[];

    // @OneToMany(() => OrderRecipe, orderRecipe => orderRecipe.recipe)
    // ordersRecipes!: OrderRecipe[];

    // @BeforeInsert()
    // @BeforeUpdate()
    // async calculateCost() {
    //     this.cost = calcular de acordo com a lista Recipe_ingredient
    // };
};