import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRecipesIngredients1645450337777 implements MigrationInterface {
    name = 'updateRecipesIngredients1645450337777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_ea793f5fd0241695924c0cbe171"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_ea793f5fd0241695924c0cbe171" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_ea793f5fd0241695924c0cbe171"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_ea793f5fd0241695924c0cbe171" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
