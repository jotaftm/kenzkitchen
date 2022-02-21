import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRecipe1645188677745 implements MigrationInterface {
    name = 'updateRecipe1645188677745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "cost" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "cost" DROP DEFAULT`);
    }

}
