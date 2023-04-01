import { InjectRepository } from '@nestjs/typeorm';
import { Flat } from './models/flat.model';
import {
  Between,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FlatFilterDto } from './models/flat.filter.dto';
import { FlatDto } from './models/flat.dto';
import { Owner } from '../owners/models/owner.model';
import { OwnerService } from '../owners/owner.service';
import { FlatUpdateDto } from './models/flat.update.dto';

export class FlatService {
  constructor(
    @InjectRepository(Flat)
    private readonly flatRepo: Repository<Flat>,
    private readonly ownerService: OwnerService,
  ) {}

  getAll = async (filter: FlatFilterDto) => {
    let ow: Owner;

    if (filter.ownerId) ow = await this.ownerService.getById(filter.ownerId);

    const where = {
      intOwnerId: filter.ownerId ? Equal(ow?.intOwnerId) : null,
      intStorey: filter.intStoreyMax
        ? filter.intStoreyMin
          ? Between(filter.intStoreyMin, filter.intStoreyMax)
          : LessThanOrEqual(filter.intStoreyMax)
        : MoreThanOrEqual(filter.intStoreyMin ?? 0),
      intCount: filter.intCountMax
        ? filter.intCountMin
          ? Between(filter.intCountMin, filter.intCountMax)
          : LessThanOrEqual(filter.intCountMax)
        : MoreThanOrEqual(filter.intCountMin ?? 0),
      fltArea: filter.fltAreaMax
        ? filter.fltAreaMin
          ? Between(filter.fltAreaMin, filter.fltAreaMax)
          : LessThanOrEqual(filter.fltAreaMax)
        : MoreThanOrEqual(filter.fltAreaMin ?? 0),
    };

    if (!where.intOwnerId) {
      delete where.intOwnerId;
    }

    return this.flatRepo.find({
      where: where,
      relations: {
        intOwnerId: true,
      },
    });
  };

  getById = async (id: number, nested: boolean) => {
    let res: Flat;

    if (nested === true) {
      res = await this.flatRepo.findOne({
        where: {
          intFlatId: id,
        },
        relations: {
          operations: true,
          intOwnerId: true,
        },
      });
    } else {
      res = await this.flatRepo.findOne({
        where: {
          intFlatId: id,
        },
      });
    }

    if (!res) {
      throw new HttpException(
        `Квартира с ID: ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res;
  };

  create = async (model: FlatDto) => {
    if (model.ownerId) {
      const ow = await this.ownerService.getById(model.ownerId);
      const res = await this.flatRepo.create({ ...model });
      console.log(ow);
      console.log(res);
      res.intOwnerId = [ow];
      console.log(res);
      await this.flatRepo.save(res);
      return res;
    } else {
      const res = await this.flatRepo.create({ ...model });
      await this.flatRepo.save(res);
      return res;
    }
  };

  update = async (model: FlatUpdateDto) => {
    let owner: Owner | undefined;

    const flat = await this.getById(model.id, false);

    if (!flat)
      throw new HttpException(
        `Квартира с ID: ${model.id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );

    if (model.ownerId) {
      owner = await this.ownerService.getById(model.ownerId);
    }

    const candidate = await this.getById(model.id, true);

    delete model.id;

    let owners = candidate.intOwnerId;

    if (!owners?.length) {
      owners = [owner];
    } else {
      owners.push(owner);
    }

    await this.flatRepo.update(flat, {
      ...model,
      intOwnerId: owners,
    });
  };

  delete = async (id: number) => {
    const isExists = await this.flatRepo.findOne({
      where: {
        intFlatId: id,
      },
    });

    if (!isExists) {
      throw new HttpException(
        `Flat with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.flatRepo.delete({
      intFlatId: id,
    });

    throw new HttpException('Success', HttpStatus.OK);
  };
}
