import { ObjectID } from 'mongodb';
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getRepository } from '@/database';
import { User } from '@/models/user';
import { createPaginationMeta, Pagination } from '@/models/pagination';

@ObjectType()
export class PaginatedUsers extends Pagination<User> {
  @Field(() => [User])
  declare items: User[];
}

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

  @Query(() => PaginatedUsers)
  async usersPaginated(
    @Arg('page') page: number,
    @Arg('limit') limit: number
  ): Promise<Pagination<User>> {
    const userRepo = await getRepository(User);
    const [result, total] = await userRepo.findAndCount({
      take: limit,
      skip: limit * page,
    });
    const meta = createPaginationMeta(page, limit, result.length, total);
    return {
      meta,
      items: result,
    };
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
