import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDeleteEntities1645479420570 implements MigrationInterface {
    name = 'updateDeleteEntities1645479420570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ordersIngredients" DROP CONSTRAINT "FK_4a8c998ced0a71338365b532618"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1"`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" DROP CONSTRAINT "FK_8740d4072ca82f9897bef4464b3"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_d48a16036eda342efb183060258"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_e8692259a2faf63b52155143717"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_c3ff598e72651d588e4b0629064"`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" ADD CONSTRAINT "FK_4a8c998ced0a71338365b532618" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" ADD CONSTRAINT "FK_8740d4072ca82f9897bef4464b3" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_e8692259a2faf63b52155143717" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_d48a16036eda342efb183060258" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_c3ff598e72651d588e4b0629064" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_c3ff598e72651d588e4b0629064"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_d48a16036eda342efb183060258"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_e8692259a2faf63b52155143717"`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" DROP CONSTRAINT "FK_8740d4072ca82f9897bef4464b3"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17"`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" DROP CONSTRAINT "FK_4a8c998ced0a71338365b532618"`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_c3ff598e72651d588e4b0629064" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_56d62ff4cdca3b7216a25655e49" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_e8692259a2faf63b52155143717" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_d48a16036eda342efb183060258" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersRecipes" ADD CONSTRAINT "FK_8740d4072ca82f9897bef4464b3" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b6fe899d5ca4a3f5925463990d1" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f79a8d61cafb2ad5f27e014ae17" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordersIngredients" ADD CONSTRAINT "FK_4a8c998ced0a71338365b532618" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
