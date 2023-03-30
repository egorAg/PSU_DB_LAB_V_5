import { InjectRepository } from '@nestjs/typeorm';
import { OperationType } from './models/op.model';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateOptDto } from './models/create.opt.dto';
import { OptUpdateDto } from './models/opt.update.dto';

export class OptService {
  constructor(
    @InjectRepository(OperationType)
    private readonly optRepo: Repository<OperationType>,
  ) {}
  getById = async (id: number) => {
    const res = await this.optRepo.findOne({
      where: {
        intOperationTypeId: id,
      },
    });

    if (!res)
      throw new HttpException(
        `Тип операции с ID: ${id} не найден`,
        HttpStatus.NOT_FOUND,
      );

    return res;
  };

  getAll = async () => {
    return this.optRepo.find();
  };

  create = async (payload: CreateOptDto) => {
    const newOPT = this.optRepo.create(payload);

    await this.optRepo.save(newOPT);

    return newOPT;
  };

  update = async (payload: OptUpdateDto) => {
    const candidate = await this.getById(payload.id);

    const id = payload.id;

    delete payload.id;

    await this.optRepo.update(candidate, payload);

    return this.getById(id);
  };

  delete = async (id: number) => {
    const candidate = await this.getById(id);
    await this.optRepo.delete(candidate);
  };
}
