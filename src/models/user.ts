import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity() // for typeorm
@ObjectType() // for graph ql
export class User {
  @ObjectIdColumn()
  @Field(() => String, {
    name: 'id',
  })
  _id: ObjectID | String;

  @Column()
  @Field(() => String)
  firstname: string;

  @Column()
  @Field(() => String)
  lastname: string;
}
