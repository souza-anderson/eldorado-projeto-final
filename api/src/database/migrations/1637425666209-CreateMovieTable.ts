import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovieTable1637425666209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movie",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "30",
                    isNullable: false
                },
                {
                    name: "synopsis",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "poster",
                    type: "varchar",
                    length: "100",
                    isNullable: false
                },
                {
                    name: "release_year",
                    type: "date",
                    isNullable: false
                },
                {
                    name: "billing",
                    type: "decimal(10,2)",
                    isNullable: false
                },
                {
                    name: "genre_id",
                    type: "int",
                    length: "11",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movie");
    }

}
