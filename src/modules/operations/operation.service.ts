import { OpFilterDto } from './dto/op.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from './models/operation.model';
import { Between, Equal, LessThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WorkerService } from '../workers/worker.service';
import { OptService } from '../operation-types/op.service';
import { FlatService } from '../flats/flat.service';
import { OperationType } from '../operation-types/models/op.model';
import { CreateOpDto } from './dto/create.op.dto';

export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly opRepo: Repository<Operation>,
    private readonly workerService: WorkerService,
    private readonly operationTypeService: OptService,
    private readonly flatService: FlatService,
  ) {}
  getAll = async (filter: OpFilterDto) => {
    if (filter.workerId) await this.workerService.getById(filter.workerId);

    if (filter.flatId) await this.flatService.getById(filter.flatId, false);

    const where = {
      intWorkerId: filter.workerId ? Equal(filter.workerId) : null,
      flats: filter.flatId ? Equal(filter.flatId) : null,
      datOperationDate: filter.operation_date_from
        ? filter.operation_date_to
          ? Between(filter.operation_date_from, filter.operation_date_to)
          : LessThanOrEqual(filter.operation_date_to)
        : null,
    };

    if (where.datOperationDate === null) {
      delete where.datOperationDate;
    }

    if (where.flats === null) {
      delete where.flats;
    }

    if (where.intWorkerId === null) {
      delete where.intWorkerId;
    }

    console.log(where);

    return this.opRepo.find({
      where: where,
    });
  };

  getById = async (id: number) => {
    const res = await this.opRepo.findOne({
      where: {
        intOperationId: id,
      },
      relations: {
        intWorkerId: true,
        flats: true,
        intOperationTypeId: true,
      },
    });

    if (!res) {
      throw new HttpException(
        `Работа с ID: ${id} не найдена`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res;
  };

  create = async (payload: CreateOpDto) => {
    const worker = await this.workerService.getById(payload.intWorkerId);
    const flat = await this.flatService.getById(payload.flatId, false);
    const operationTypes: OperationType[] = [];

    for (const id of payload.operationTypeId) {
      const opType = await this.operationTypeService.getById(id);
      operationTypes.push(opType);
    }

    delete payload.operationTypeId;

    const model = new Operation();

    model.intOperationTypeId = operationTypes;
    model.intWorkerId = worker;
    model.flats = flat;
    model.txtOperationDescription = payload.txtOperationDescription;
    model.datOperationDate = payload.datOperationDate
      ? new Date(payload.datOperationDate)
      : new Date();

    console.log(model);

    await this.opRepo.save(model);

    return model;
  };

  // update = async (payload: any) => {};

  delete = async (id: number) => {
    await this.getById(id);

    await this.opRepo.delete({
      intOperationId: id,
    });

    throw new HttpException(`Success`, HttpStatus.OK);
  };
}
