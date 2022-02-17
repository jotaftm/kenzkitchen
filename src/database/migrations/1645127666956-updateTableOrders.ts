import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTableOrders1645127666956 implements MigrationInterface {
    name = 'updateTableOrders1645127666956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdBy"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "createdBy" character varying NOT NULL`);
    }

}
