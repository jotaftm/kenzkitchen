import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCompany1644944861878 implements MigrationInterface {
    name = 'updateCompany1644944861878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "createdBy" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "createdBy"`);
    }

}
