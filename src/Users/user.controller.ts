import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/Users/user.service';

interface User {
  id: number;
  name: string;
  lastname: string;
  phone: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): Array<User> {
    return this.userService.getUsers();
  }
  @Get('/:id')
  getUser(@Param('id') id) {
    return this.userService.getUser(id);
  }
}
