import { ObjectID } from 'mongodb';
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { getModel } from 'better-mongoose';
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
    const userModel = await getModel(User);

    // get one user with the matching name or fail
    const data = await userModel.findOne({
      $where: function () {
        return this._id === new ObjectID(id);
      },
    });
    return data.toObject<User>();
  }

  @Query(() => PaginatedUsers)
  async usersPaginated(
    @Arg('page') page: number,
    @Arg('limit') limit: number
  ): Promise<Pagination<User>> {
    const userModel = await getModel(User);
    const total = await userModel.count();
    const result = await userModel
      .find()
      .skip(limit * page)
      .limit(limit);

    const meta = createPaginationMeta(page, limit, result.length, total);
    return {
      meta,
      items: [...result.map((r) => r.toObject<User>())],
    };
  }

  @Mutation(() => User)
  async create(
    @Arg('firstname')
    firstname: string,
    @Arg('lastname')
    lastname: string
  ): Promise<User> {
    const userRepo = await getModel(User);
    const result = await userRepo.collection.insertOne({
      firstname,
      lastname,
    });
    return {
      _id: result.insertedId.toString(),
      firstname,
      lastname,
    };
  }
}
