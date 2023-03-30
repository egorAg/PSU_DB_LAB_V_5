import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OpFilterDto } from './dto/op.filter.dto';
import { OperationService } from './operation.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOpDto } from './dto/create.op.dto';
import { Operation } from './models/operation.model';

@ApiTags('Операции')
@Controller('op')
export class OpController {
  constructor(private readonly service: OperationService) {}

  @Post('getAll')
  @ApiOperation({
    description: 'Получить все операции',
  })
  @ApiOkResponse({
    description: 'Операции',
    type: Operation,
    isArray: true,
  })
  public async getAll(@Body() filter: OpFilterDto) {
    return this.service.getAll(filter);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Получить операцию по id',
  })
  @ApiOkResponse({
    description: 'Операция',
    type: Operation,
    isArray: false,
  })
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({
    description: 'Создать операцию',
  })
  @ApiOkResponse({
    description: 'Операция',
    type: Operation,
    isArray: false,
  })
  public async create(@Body() payload: CreateOpDto) {
    return this.service.create(payload);
  }

  @Patch()
  @ApiOperation({
    description: 'Обновить операцию (DEV)',
  })
  @ApiOkResponse({
    description: 'Операция',
    type: Operation,
    isArray: false,
  })
  public async update(@Body() payload: any) {
    return payload;
    // return this.service.update(payload);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Удалть операцию',
  })
  @ApiOkResponse({
    description: 'Операция',
    type: Operation,
    isArray: false,
  })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
