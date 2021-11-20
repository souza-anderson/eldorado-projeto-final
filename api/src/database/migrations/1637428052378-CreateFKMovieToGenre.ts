import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateFKMovieToGenre1637428052378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "movie",
            new TableForeignKey({
                columnNames: ["genre_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "genre",
                name: "fk_movie_genre"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("movie", "fk_movie_genre");
    }

}
