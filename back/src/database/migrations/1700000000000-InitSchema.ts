import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1700000000000 implements MigrationInterface {
  name = 'InitSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "model_types" (
        "id"          SERIAL          NOT NULL,
        "name"        VARCHAR(100)    NOT NULL,
        "description" TEXT,
        "created_at"  TIMESTAMP       NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP       NOT NULL DEFAULT now(),
        CONSTRAINT "PK_model_types" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "cars" (
        "id"            SERIAL            NOT NULL,
        "model_number"  VARCHAR(100)      NOT NULL,
        "price"         NUMERIC(12,2)     NOT NULL,
        "description"   TEXT,
        "preview"       VARCHAR,
        "model"         VARCHAR,
        "model_type_id" INTEGER           NOT NULL,
        "created_at"    TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at"    TIMESTAMP         NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cars" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cars_model_type"
          FOREIGN KEY ("model_type_id")
          REFERENCES "model_types"("id")
          ON DELETE RESTRICT
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "colors" (
        "id"         SERIAL       NOT NULL,
        "name"       VARCHAR(100) NOT NULL,
        "hex"        VARCHAR(7)   NOT NULL,
        "car_id"     INTEGER      NOT NULL,
        "created_at" TIMESTAMP    NOT NULL DEFAULT now(),
        CONSTRAINT "PK_colors" PRIMARY KEY ("id"),
        CONSTRAINT "FK_colors_car"
          FOREIGN KEY ("car_id")
          REFERENCES "cars"("id")
          ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "colors"`);
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TABLE "model_types"`);
  }
}
