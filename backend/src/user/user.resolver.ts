import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserList } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/generated/enums';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Query(() => UserList)
  findAllUser() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOneUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
  
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }

}
