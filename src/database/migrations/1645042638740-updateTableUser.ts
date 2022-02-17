import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTableUser1645042638740 implements MigrationInterface {
    name = 'updateTableUser1645042638740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdm" TO "isManager"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isManager" TO "isAdm"`);
    }

}
