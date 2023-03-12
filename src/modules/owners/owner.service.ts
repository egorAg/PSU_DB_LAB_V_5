import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './models/owner.model';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OwnerCreateDto } from './models/owner.create.dto';
import { OwnerUpdateDto } from './models/owner.update.dto';

export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  getAll = async () => {
    return this.ownerRepo.find();
  };

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

  create = async (payload: OwnerCreateDto) => {
    const res = await this.ownerRepo.create(payload);
    await this.ownerRepo.save(res);
    return res;
  };

  update = async (data: OwnerUpdateDto) => {
    const owner = await this.getById(data.id);

    delete data['id'];

    await this.ownerRepo.update(owner, data);
  };

  delete = async (id: number) => {
    const candidate = await this.getById(id);
    await this.ownerRepo.delete(candidate);
  };
}
