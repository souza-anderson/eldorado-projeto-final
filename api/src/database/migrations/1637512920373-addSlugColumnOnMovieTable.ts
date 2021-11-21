import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addSlugColumnOnMovieTable1637512920373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("movie", new TableColumn({
            name: "slug",
            type: "varchar"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("movie", "slug");
    }

}
