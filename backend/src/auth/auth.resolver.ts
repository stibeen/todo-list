import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse, SignUpResponse } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/signin-input';
import { Public } from 'src/common/decorator/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignUpResponse)
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => SignUpResponse)
  signUpAdmin(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signUpAdmin(signUpInput);
  }

  @Public()
  @Mutation(() => SignInResponse)
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }
}
