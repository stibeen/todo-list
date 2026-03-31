import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/generated/enums';

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

  @Field({nullable: true})
  createdAt: Date;

  @Field({nullable: true})
  updatedAt: Date;
}
