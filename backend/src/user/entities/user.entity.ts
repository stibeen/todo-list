import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field({nullable: true})
  createdAt: Date;

  @Field({nullable: true})
  updatedAt: Date;
}
