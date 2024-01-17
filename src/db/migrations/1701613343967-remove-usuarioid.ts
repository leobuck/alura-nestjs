import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUsuarioid1701613343967 implements MigrationInterface {
  name = 'RemoveUsuarioid1701613343967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`,
    );
  }
}
