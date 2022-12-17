import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const createdUser = this.userRepository.create(createUserInput);
    createdUser.password = bcrypt.hashSync(createdUser.password, 10);
    return this.userRepository.save(createdUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(query: any): Promise<User> {
    return this.userRepository.findOneBy(query);
  }

  findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserInput: UpdateUserInput): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserInput);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
