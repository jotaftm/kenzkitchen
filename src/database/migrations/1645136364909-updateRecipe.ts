import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRecipe1645136364909 implements MigrationInterface {
    name = 'updateRecipe1645136364909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "cost" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "cost"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "cost" integer NOT NULL`);
    }

}
