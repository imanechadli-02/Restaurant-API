import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDishTable1784706584601 implements MigrationInterface {
    name = 'CreateDishTable1784706584601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Dishes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`categoryId\` int NOT NULL, UNIQUE INDEX \`IDX_3234d4de35f745478ecf84306d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Dishes\` ADD CONSTRAINT \`FK_fdb12922d5d7154fa10c5f21f6d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Dishes\` DROP FOREIGN KEY \`FK_fdb12922d5d7154fa10c5f21f6d\``);
        await queryRunner.query(`DROP INDEX \`IDX_3234d4de35f745478ecf84306d\` ON \`Dishes\``);
        await queryRunner.query(`DROP TABLE \`Dishes\``);
    }

}
