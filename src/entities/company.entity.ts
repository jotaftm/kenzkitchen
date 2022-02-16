import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import Recipe from "./recipe.entity";
import Ingredient from "./ingredient.entity";

@Entity('companies')
export default class Company {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    cnpj!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    createdBy!: string;

    @OneToMany(() => Recipe, recipe => recipe.company)
    recipes!: Recipe[];

    @OneToMany(() => Ingredient, (ingredient) => ingredient.company)
    ingredients!: Ingredient[];
};