import {MigrationInterface, QueryRunner} from "typeorm";

export class updateTables1645048279921 implements MigrationInterface {
    name = 'updateTables1645048279921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_e8692259a2faf63b52155143717" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_c3ff598e72651d588e4b0629064" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_c3ff598e72651d588e4b0629064"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_e8692259a2faf63b52155143717"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "ownerId"`);
    }

}
