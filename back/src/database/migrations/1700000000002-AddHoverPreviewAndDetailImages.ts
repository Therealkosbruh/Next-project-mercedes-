import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHoverPreviewAndDetailImages1700000000002 implements MigrationInterface {
  name = 'AddHoverPreviewAndDetailImages1700000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "cars"
        ADD COLUMN "hover_preview" VARCHAR
    `);

    await queryRunner.query(`
      CREATE TABLE "car_detail_images" (
        "id"         SERIAL       NOT NULL,
        "url"        VARCHAR      NOT NULL,
        "sort_order" SMALLINT     NOT NULL DEFAULT 0,
        "car_id"     INTEGER      NOT NULL,
        "created_at" TIMESTAMP    NOT NULL DEFAULT now(),
        CONSTRAINT "PK_car_detail_images" PRIMARY KEY ("id"),
        CONSTRAINT "FK_car_detail_images_car"
          FOREIGN KEY ("car_id")
          REFERENCES "cars"("id")
          ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_car_detail_images_car_id" ON "car_detail_images" ("car_id", "sort_order")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_car_detail_images_car_id"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "car_detail_images"`);
    await queryRunner.query(
      `ALTER TABLE "cars" DROP COLUMN IF EXISTS "hover_preview"`,
    );
  }
}
