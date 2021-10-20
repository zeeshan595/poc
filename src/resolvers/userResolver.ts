import { ObjectID } from 'mongodb';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from '@/database';
import { User } from '@/models/user';

// setup graphql resolver
@Resolver()
export class UserResolver {
  // graphql returns user object
  @Query(() => User)
  async name(
    // graphql expects uuid as argument
    @Arg('id')
    id: string
  ): Promise<User> {
    // get user repository
    // this can be used to interact with mongodb
    const userRepo = await getRepository(User);

    // get one user with the matching name or fail
    return await userRepo.findOne({
      _id: new ObjectID(id),
    });
  }

  @Mutation(() => User)
  async create(
    @Arg('firstname')
    firstname: string,
    @Arg('lastname')
    lastname: string
  ): Promise<User> {
    const userRepo = await getRepository(User);
    const user = await userRepo.insertOne({
      firstname,
      lastname,
    } as User);
    return {
      _id: user.insertedId.toString(),
      firstname,
      lastname,
    };
  }
}
