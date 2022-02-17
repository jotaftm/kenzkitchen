import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableOrders1645126546608 implements MigrationInterface {
    name = 'createTableOrders1645126546608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ordersIngredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "orderId" uuid, "ingredientId" uuid, CONSTRAINT "PK_48d5a58ec170e73a4f58778c590" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isExecuted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "scheduled" TIMESTAMP NOT NULL, "createdBy" character varying NOT NULL, "ownerId" uuid, "companyId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordersRecipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "orderId" uuid, "recipeId" uuid, CONSTRAINT "PK_463ebdf1690a12ca3d5b04d110b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" ADD CONSTRAINT "FK_4a8c998ced0a71338365b532618" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" ADD CONSTRAINT "FK_8b296129d5961b3e0de5f27a72e" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" ADD CONSTRAINT "FK_8740d4072ca82f9897bef4464b3" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" ADD CONSTRAINT "FK_e68499e9d4f70848db51cc8410d" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordersRecipes" DROP CONSTRAINT "FK_e68499e9d4f70848db51cc8410d"`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" DROP CONSTRAINT "FK_8740d4072ca82f9897bef4464b3"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17"`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" DROP CONSTRAINT "FK_8b296129d5961b3e0de5f27a72e"`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" DROP CONSTRAINT "FK_4a8c998ced0a71338365b532618"`);
        await queryRunner.query(`DROP TABLE "ordersRecipes"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "ordersIngredients"`);
    }

}
