import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './models/owner.model';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  getById = async (id: number) => {
    const res = await this.ownerRepo.findOne({
      where: {
        intOwnerId: id,
      },
    });

    if (!res) {
      throw new HttpException(
        `Владелец с ID: ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res;
  };
}
