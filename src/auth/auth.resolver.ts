import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => LoginResponse)
  async register(@Args('loginInput') loginInput: CreateUserInput) {
    return this.authService.login(loginInput);
  }
}
