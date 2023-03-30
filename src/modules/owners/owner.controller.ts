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
import { OwnerService } from './owner.service';
import { OwnerCreateDto } from './models/owner.create.dto';
import { OwnerUpdateDto } from './models/owner.update.dto';
import { Owner } from './models/owner.model';

@ApiTags('Владельцы')
@Controller('owner')
export class OwnerController {
  constructor(private readonly service: OwnerService) {}

  @Get()
  @ApiOperation({
    description: 'Получить список всех владельцев',
  })
  @ApiOkResponse({
    description: 'Владельцы',
    type: Owner,
    isArray: true,
  })
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Получить владельца',
  })
  @ApiOkResponse({
    description: 'Владелец',
    type: Owner,
    isArray: false,
  })
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({
    description: 'Создать владельца',
  })
  @ApiOkResponse({
    description: 'Владелец',
    type: Owner,
    isArray: false,
  })
  public async create(@Body() payload: OwnerCreateDto) {
    return this.service.create(payload);
  }

  @Patch()
  @ApiOperation({
    description: 'Обновить владельца',
  })
  @ApiOkResponse({
    description: 'Владелец',
    type: Owner,
    isArray: false,
  })
  public async update(@Body() payload: OwnerUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Удалить владельца',
  })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
