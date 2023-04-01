import { InjectRepository } from '@nestjs/typeorm';
import { Flat } from './models/flat.model';
import { Repository } from 'typeorm';
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
    await this.ownerService.getById(filter.ownerId);

    const queryBuilder = this.flatRepo
      .createQueryBuilder('flat')
      .leftJoinAndSelect('flat.intOwnerId', 'owner');

    if (filter.ownerId) {
      queryBuilder.where('owner.intOwnerId = :ownerId', {
        ownerId: filter.ownerId,
      });
    }

    if (filter.fltAreaMin !== undefined) {
      queryBuilder.andWhere('flat.fltArea >= :fltAreaMin', {
        fltAreaMin: filter.fltAreaMin,
      });
    }

    if (filter.fltAreaMax !== undefined) {
      queryBuilder.andWhere('flat.fltArea <= :fltAreaMax', {
        fltAreaMax: filter.fltAreaMax,
      });
    }

    if (filter.intCountMin !== undefined) {
      queryBuilder.andWhere('flat.intCount >= :intCountMin', {
        intCountMin: filter.intCountMin,
      });
    }

    if (filter.intCountMax !== undefined) {
      queryBuilder.andWhere('flat.intCount <= :intCountMax', {
        intCountMax: filter.intCountMax,
      });
    }

    if (filter.intStoreyMin !== undefined) {
      queryBuilder.andWhere('flat.intStorey >= :intStoreyMin', {
        intStoreyMin: filter.intStoreyMin,
      });
    }

    if (filter.intStoreyMax !== undefined) {
      queryBuilder.andWhere('flat.intStorey <= :intStoreyMax', {
        intStoreyMax: filter.intStoreyMax,
      });
    }

    queryBuilder.select([
      'flat.intFlatId',
      'flat.txtFlatAddress',
      'flat.fltArea',
      'flat.intCount',
      'flat.intStorey',
      'owner.intOwnerId',
      'owner.txtOwnerSurname',
      'owner.txtOwnerName',
      'owner.txtOwnerSecondName',
      'owner.txtAddress',
    ]);

    return await queryBuilder.getMany();
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
