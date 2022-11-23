import { UserService } from './Users/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './Users/user.controller';

@Module({
  imports: [],
  controllers: [UserController, AppController],
  providers: [UserService, AppService],
})
export class AppModule {}
