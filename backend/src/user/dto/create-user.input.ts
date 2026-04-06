import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from 'src/generated/enums';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class CreateUserInput {
  @Field(() => String, {nullable: false})
  username!: string;

  @Field(() => String, {nullable: false})
  hashedassword!: string;

  @Field(() => Role, {nullable: true})
  role: Role;
}
