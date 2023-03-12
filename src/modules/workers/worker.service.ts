import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './models/worker.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateWorkerDto } from './models/create.worker.dto';
import { UpdateWorkerDto } from './models/update.worker.dto';

export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepo: Repository<Worker>,
  ) {}

  getAll = async () => {
    return this.workerRepo.find();
  };

  getById = async (id: number) => {
    const candidate = await this.workerRepo.findOne({
      where: {
        intWorkerId: id,
      },
    });

    if (!candidate)
      throw new HttpException(
        `Работник с ID: ${id} не найден`,
        HttpStatus.NOT_FOUND,
      );

    return candidate;
  };

  create = async (p: CreateWorkerDto) => {
    const worker = this.workerRepo.create(p);

    await this.workerRepo.save(worker);
    return worker;
  };

  update = async (p: UpdateWorkerDto) => {
    const candidate = await this.getById(p.id);

    delete p.id;

    await this.workerRepo.update(candidate, p);
  };

  delete = async (id: number) => {
    const candidate = await this.getById(id);

    await this.workerRepo.delete(candidate);

    return new HttpException('Success', HttpStatus.OK);
  };
}
