import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRecipesIngredients1645035275674 implements MigrationInterface {
    name = 'updateRecipesIngredients1645035275674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD "ingredientId" uuid`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_65e682bbc2d967b3cf76f4d026c"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP COLUMN "ingredientId"`);
    }

}
