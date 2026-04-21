import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCarFields1700000000001 implements MigrationInterface {
  name = 'AddCarFields1700000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "cars"
        ADD COLUMN "short_description" VARCHAR(300),
        ADD COLUMN "year"              SMALLINT,
        ADD COLUMN "body_type"         VARCHAR(50),
        ADD COLUMN "fuel_type"         VARCHAR(30),
        ADD COLUMN "transmission"      VARCHAR(20),
        ADD COLUMN "engine_volume"     NUMERIC(3,1),
        ADD COLUMN "power_hp"          SMALLINT,
        ADD COLUMN "drive_type"        VARCHAR(10),
        ADD COLUMN "is_amg"            BOOLEAN NOT NULL DEFAULT false,
        ADD COLUMN "is_electric"       BOOLEAN NOT NULL DEFAULT false,
        ADD COLUMN "seats"             SMALLINT,
        ADD COLUMN "slug"              VARCHAR(100)
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_cars_slug" ON "cars" ("slug")
      WHERE "slug" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_cars_slug"`);
    await queryRunner.query(`
      ALTER TABLE "cars"
        DROP COLUMN IF EXISTS "short_description",
        DROP COLUMN IF EXISTS "year",
        DROP COLUMN IF EXISTS "body_type",
        DROP COLUMN IF EXISTS "fuel_type",
        DROP COLUMN IF EXISTS "transmission",
        DROP COLUMN IF EXISTS "engine_volume",
        DROP COLUMN IF EXISTS "power_hp",
        DROP COLUMN IF EXISTS "drive_type",
        DROP COLUMN IF EXISTS "is_amg",
        DROP COLUMN IF EXISTS "is_electric",
        DROP COLUMN IF EXISTS "seats",
        DROP COLUMN IF EXISTS "slug"
    `);
  }
}
