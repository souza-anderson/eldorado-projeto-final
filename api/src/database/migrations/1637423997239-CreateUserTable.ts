import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1637423997239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "user",
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
                    isNullable: false,
                    length: "30"
                },
                {
                    name: "email",
                    type: "text",
                    isNullable: false,
                    length: "100"
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: true,
                    length: "100"
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
