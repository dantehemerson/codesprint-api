// import {
//   MigrationInterface,
//   QueryRunner,
//   Table,
//   TableForeignKey,
// } from 'typeorm';

// export default class CreateCategories1599350249468
//   implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'challenges',
//         columns: [
//           {
//             name: 'id',
//             type: 'uuid',
//             isPrimary: true,
//             generationStrategy: 'uuid',
//             default: 'uuid_generate_v4()',
//           },
//           {
//             name: 'title',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'intro',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'thumbnail',
//             type: 'varchar',
//             isNullable: true,
//           },
//           {
//             name: 'bodyHtml',
//             type: 'varchar',
//             isNullable: false,
//           },

//           {
//             name: 'bodyMarkdown',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'categories',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'createdBy',
//             type: 'varchar',
//             isNullable: false,
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//           {
//             name: 'updated_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//         ],
//       }),
//     );

//     await queryRunner.createForeignKey(
//       'users',
//       new TableForeignKey({
//         name: 'CreatedBy',
//         columnNames: ['createdBy'],
//         referencedColumnNames: ['id'],
//         referencedTableName: 'users',
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE',
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropForeignKey('users', 'CreatedBy');
//     await queryRunner.dropTable('challenges');
//   }
// }
