import {MigrationInterface, QueryRunner} from "typeorm";
import bcryptjs from "bcryptjs";

export class addUserInUserTable1637637494356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = await bcryptjs.hash("abc123", 10);
        const sql = `INSERT INTO User (name, email, password, created_at) VALUES('Super Administrador', 'admin@admin.com', '${passwordHash}', '2021-11-22')`;
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM User WHERE email = 'admin@admin.com' `);
    }

}
