import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieRelation1701018696054 implements MigrationInterface {
    name = 'CreateMovieRelation1701018696054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "age" integer NOT NULL, "release" character varying NOT NULL, "duration" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_ec7ed42b2e89092919129bdf990" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_ec7ed42b2e89092919129bdf990"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
