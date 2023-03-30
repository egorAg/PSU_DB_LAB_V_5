import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatFilterDto } from './models/flat.filter.dto';
import { FlatDto } from './models/flat.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FlatUpdateDto } from './models/flat.update.dto';
import { Flat } from './models/flat.model';

@ApiTags('Квартиры')
@Controller('flat')
export class FlatController {
  constructor(private readonly service: FlatService) {}

  @Post('getAll')
  @ApiOperation({
    description: 'Получить все квартиры',
  })
  @ApiOkResponse({
    description: 'Массив квартир',
    type: Flat,
    isArray: true,
  })
  public async getAll(@Body() filter: FlatFilterDto): Promise<Flat[]> {
    return this.service.getAll(filter);
  }

  @ApiOperation({
    description: 'Получить квартиру по id',
  })
  @ApiOkResponse({
    description: 'Квартира',
    type: Flat,
    isArray: true,
  })
  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id, true);
  }

  @Post()
  @ApiOperation({
    description: 'Создать квартиру',
  })
  @ApiOkResponse({
    description: 'Квартира создана успешно',
    type: Flat,
    isArray: true,
  })
  public async create(@Body() payload: FlatDto) {
    return this.service.create(payload);
  }

  @Patch()
  @Post()
  @ApiOperation({
    description: 'Обновить данные квартиры',
  })
  @ApiOkResponse({
    description: 'Квартира обновлена успешно',
    type: Flat,
    isArray: true,
  })
  public async update(@Body() payload: FlatUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Удалить квартиру',
  })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
