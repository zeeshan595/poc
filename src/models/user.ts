import { Field, ObjectType } from 'type-graphql';
import { Schema, Property } from 'better-mongoose';

@Schema()
@ObjectType() // for graph ql
export class User {
  @Property()
  @Field(() => String, {
    name: 'id',
  })
  _id: string;

  @Property()
  @Field(() => String)
  firstname: string;

  @Property()
  @Field(() => String)
  lastname: string;
}
