import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Task { 
  @Field()
  title: string;

  @Field({nullable: true})
  isFinished: boolean;

  @Field({nullable: true})
  createdAt: Date;

  @Field({nullable: true})
  updatedAt: Date;
}
