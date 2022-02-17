import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRelationUser1645106419318 implements MigrationInterface {
    name = 'updateRelationUser1645106419318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "companyId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isManager" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isManager" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyId"`);
    }

}
