import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const savedOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(savedOwner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOneBy({ id });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerRepository.update(id, updateOwnerInput);
  }

  remove(id: number) {
    return this.ownerRepository.delete(id);
  }
}
