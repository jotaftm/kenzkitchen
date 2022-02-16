import {MigrationInterface, QueryRunner} from "typeorm";

export class createIngredient1645031747810 implements MigrationInterface {
    name = 'createIngredient1645031747810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "barCode" character varying NOT NULL, "description" character varying NOT NULL, "quantity" integer NOT NULL, "unity" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_4c54324b5a9964197a59dc11f98" UNIQUE ("barCode"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ingredients"`);
    }

}
