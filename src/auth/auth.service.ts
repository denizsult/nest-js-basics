import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    const isPasswordValid = this.usersService.comparePassword(
      password,
      user?.password,
    );

    console.log(isPasswordValid);

    if (isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginResponse: LoginInput) {
    const user = await this.usersService.findOne({
      email: loginResponse.email,
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user: result,
    };
  }

  async register(loginResponse: CreateUserInput) {
    const isUserAlreadyExists = await this.usersService.findOne({
      email: loginResponse.email,
    });

    if (isUserAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = await this.usersService.create(loginResponse);

    return user;
  }
}
