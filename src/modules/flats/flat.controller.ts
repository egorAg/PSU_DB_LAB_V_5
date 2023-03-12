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
import { ApiTags } from '@nestjs/swagger';
import { FlatUpdateDto } from './models/flat.update.dto';

@ApiTags('Квартиры')
@Controller('flat')
export class FlatController {
  constructor(private readonly service: FlatService) {}

  @Post('getAll')
  public async getAll(@Body() filter: FlatFilterDto) {
    return this.service.getAll(filter);
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id, true);
  }

  @Post()
  public async create(@Body() payload: FlatDto) {
    return this.service.create(payload);
  }

  @Patch()
  public async update(@Body() payload: FlatUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
