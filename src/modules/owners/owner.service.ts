import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './models/owner.model';
import { Repository } from 'typeorm';

export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  getById = async (id: number) => {
    return this.ownerRepo.findOne({
      where: {
        intOwnerId: id,
      },
    });
  };
}
