import { InjectRepository } from '@nestjs/typeorm';
import { Flat } from './models/flat.model';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FlatFilterDto } from './models/flat.filter.dto';
import { FlatDto } from './models/flat.dto';
import { Owner } from '../owners/models/owner.model';
import { OwnerService } from '../owners/owner.service';
import { filter } from 'rxjs';

export class FlatService {
  constructor(
    @InjectRepository(Flat)
    private readonly flatRepo: Repository<Flat>,
    private readonly ownerService: OwnerService,
  ) {}

  getAll = async (filter: FlatFilterDto) => {
    const where: any = {};

    if (filter.ownerId) where.intOwnerId = '';

    if (filter.intCountMax && !filter.intCountMin)
      where.intCount = LessThanOrEqual(filter.intCountMax);

    if (filter.intCountMin && !filter.intCountMax)
      where.intCount = MoreThanOrEqual(filter.intCountMin);

    if (filter.intCountMin && filter.intCountMax)
      where.intCount = Between(filter.intCountMin, filter.intCountMax);

    if (filter.fltAreaMax && !filter.intCountMin)
      where.fltAreaMax = LessThanOrEqual(filter.fltAreaMax);

    if (filter.fltAreaMax && !filter.intCountMin)
      where.fltAreaMax = MoreThanOrEqual(filter.fltAreaMin);

    if (filter.fltAreaMax && !filter.intCountMin)
      where.fltAreaMax = Between(filter.fltAreaMin, filter.fltAreaMax);

    if (filter.intStoreyMax && !filter.intStoreyMin)
      where.intStorey = LessThanOrEqual(filter.intStoreyMax);

    if (filter.fltAreaMax && !filter.intCountMin)
      where.intStorey = MoreThanOrEqual(filter.intStoreyMin);

    if (filter.fltAreaMax && !filter.intCountMin)
      where.intStorey = Between(filter.intCountMin, filter.intCountMax);

    return this.flatRepo.find({
      where: where,
    });
  };

  getById = async (id: number, nested: boolean) => {
    let res: Flat;

    if (nested)
      res = await this.flatRepo.findOne({
        where: {
          intFlatId: id,
        },
        relations: {
          operations: true,
          intOwnerId: true,
        },
      });

    res = await this.flatRepo.findOne({
      where: {
        intFlatId: id,
      },
    });

    if (!res) {
      throw new HttpException(
        `Flat with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return res;
  };

  create = async (model: FlatDto) => {
    let owner: Owner;
    if (model.ownerId) {
      owner = await this.ownerService.getById(model.ownerId);
      const res = await this.flatRepo.create({ ...model, intOwnerId: owner });
      return res;
    }
    return this.flatRepo.create({ ...model });
  };

  update = async (model: FlatDto) => {
    if (!model.intFlatId)
      throw new HttpException(
        'intOwnerId is required!',
        HttpStatus.BAD_REQUEST,
      );

    let owner: Owner;

    if (model.ownerId) {
      owner = await this.ownerService.getById(model.ownerId);
      if (!owner)
        throw new HttpException(
          `Owner with id: ${model.ownerId} not found`,
          HttpStatus.NOT_FOUND,
        );
    }

    const flat = await this.flatRepo.findOne({
      where: {
        intFlatId: model.intFlatId,
      },
    });

    if (!flat)
      throw new HttpException(
        `Flat with id: ${model.intFlatId} not found!`,
        HttpStatus.NOT_FOUND,
      );

    await this.flatRepo.update({ ...model, intOwnerId: owner }, flat);
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
