import {MigrationInterface, QueryRunner} from "typeorm";

export class createRecipeAndRecipesIngredients1645033724333 implements MigrationInterface {
    name = 'createRecipeAndRecipesIngredients1645033724333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipesIngredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "recipeId" uuid, CONSTRAINT "PK_050c55cd9847c7aea9f074f4427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "yield" integer NOT NULL, "unity" character varying NOT NULL, "cost" integer NOT NULL, "companyId" uuid, CONSTRAINT "UQ_dcf93c3e497af5c56bc8312be80" UNIQUE ("name"), CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" ADD CONSTRAINT "FK_ea793f5fd0241695924c0cbe171" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_d48a16036eda342efb183060258" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_d48a16036eda342efb183060258"`);
        await queryRunner.query(`ALTER TABLE "recipesIngredients" DROP CONSTRAINT "FK_ea793f5fd0241695924c0cbe171"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "recipesIngredients"`);
    }

}
