import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const savedPet = this.petRepository.create(createPetInput);
    return this.petRepository.save(savedPet);
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  findOne(id: number): Promise<Pet> {
    return this.petRepository.findOneBy({ id });
  }

  update(id: number, updatePetInput: UpdatePetInput): Promise<UpdateResult> {
    return this.petRepository.update(id, updatePetInput);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.petRepository.delete(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
