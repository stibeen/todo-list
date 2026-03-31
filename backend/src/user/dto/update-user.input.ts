import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/generated/enums';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;

  @Field(() => Role, {nullable: true})
  role: Role;
}
