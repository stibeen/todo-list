import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/generated/enums';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field(() => Role, {nullable: true})
  role: Role;
}
