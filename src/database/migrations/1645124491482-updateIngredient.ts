import {MigrationInterface, QueryRunner} from "typeorm";

export class updateIngredient1645124491482 implements MigrationInterface {
    name = 'updateIngredient1645124491482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "price" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "price" integer NOT NULL`);
    }

}
