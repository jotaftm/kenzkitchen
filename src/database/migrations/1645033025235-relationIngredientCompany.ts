import {MigrationInterface, QueryRunner} from "typeorm";

export class relationIngredientCompany1645033025235 implements MigrationInterface {
    name = 'relationIngredientCompany1645033025235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "companyId"`);
    }

}
