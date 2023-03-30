import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOptDto } from './models/create.opt.dto';
import { OptUpdateDto } from './models/opt.update.dto';
import { OptService } from './op.service';
import { OperationType } from './models/op.model';

@ApiTags('Типы операций')
@Controller('opt')
export class OptController {
  constructor(private readonly service: OptService) {}

  @Get()
  @ApiOperation({
    description: 'Получить все доступные типы операций',
  })
  @ApiOkResponse({
    description: 'Массив типов операций',
    type: OperationType,
    isArray: true,
  })
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Получить тип операции по id',
  })
  @ApiOkResponse({
    description: 'Тип операции',
    type: OperationType,
    isArray: false,
  })
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({
    description: 'Создать тип операции',
  })
  @ApiOkResponse({
    description: 'Тип операции',
    type: OperationType,
    isArray: false,
  })
  public async create(@Body() payload: CreateOptDto) {
    return this.service.create(payload);
  }

  @Patch()
  @ApiOperation({
    description: 'Обновить тип операции',
  })
  @ApiOkResponse({
    description: 'Тип операции',
    type: OperationType,
    isArray: false,
  })
  public async update(@Body() payload: OptUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Удалить тип операции',
  })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
