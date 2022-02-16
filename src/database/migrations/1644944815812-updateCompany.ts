import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCompany1644944815812 implements MigrationInterface {
    name = 'updateCompany1644944815812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "createdBy"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "createdBy" character varying NOT NULL`);
    }

}
