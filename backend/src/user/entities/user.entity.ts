import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/generated/enums';
import { Task } from 'src/task/entities/task.entity';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field(() => Role, {nullable: true})
  role: Role;

  @Field(() => [Task], {nullable: true})
  tasks: Task[];

  @Field({nullable: true})
  createdAt: Date;

  @Field({nullable: true})
  updatedAt: Date;
}

@ObjectType()
export class UserList {
  @Field(() => [User])
  users: User[];

  @Field()
  total: number;

  @Field()
  success: boolean;

  @Field()
  message: string;
}
