import { User } from '@/models/user';
import { MigrationInterface, ObjectID, QueryRunner } from 'typeorm';
import { View } from 'typeorm/schema-builder/view/View';

export class init1634669695997 implements MigrationInterface {
  // applies migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getMongoRepository(User);
    await userRepo.insertOne({
      firstname: 'zeeshan',
      lastname: 'abid',
    } as User);
  }

  // reverts migration
  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getMongoRepository(User);
    const users = await userRepo.find({
      where: {
        firstname: 'zeeshan',
        lastname: 'abid',
      },
    });
    const userIds = users.map((u) => u._id) as ObjectID[];
    userRepo.delete(userIds);
  }
}
