import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user?.password === password) {
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
      access_token: 'jwt',
      user: result,
    };
  }
}
