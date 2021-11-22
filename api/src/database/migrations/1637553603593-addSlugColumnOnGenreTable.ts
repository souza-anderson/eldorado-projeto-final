import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addSlugColumnOnGenreTable1637553603593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("genre", new TableColumn({
            name: "slug",
            type: "varchar"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("genre", "slug");
    }

}
