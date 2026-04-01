import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Task { 
  @Field()
  title!: string;

  @Field({nullable: true})
  isFinished?: boolean;

  @Field({nullable: true})
  createdAt?: Date;

  @Field({nullable: true})
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  author?: User;
}

@ObjectType()
export class TaskList {
  @Field(() => [Task])
  tasks: Task[];

  @Field()
  count: number;

  @Field()
  message: string;
}

@ObjectType()
export class TaskResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Task, { nullable: true })
  task?: Task;
}

