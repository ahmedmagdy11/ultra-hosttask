import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1732977194294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //     id: Auto-generated UUID
    // title: string (required)
    // description: string (optional)
    // status: string (enum: Pending, In Progress, Completed, default: Pending)
    // createdBy: UUID (foreign key referencing User)
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdBy',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'tasks_createdBy_fkey',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['createdBy'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
