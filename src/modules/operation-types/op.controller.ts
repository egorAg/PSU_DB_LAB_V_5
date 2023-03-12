import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOptDto } from './models/create.opt.dto';
import { OptUpdateDto } from './models/opt.update.dto';
import { OptService } from './op.service';

@ApiTags('Типы операций')
@Controller('opt')
export class OptController {
  constructor(private readonly service: OptService) {}

  @Get()
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  public async create(@Body() payload: CreateOptDto) {
    return this.service.create(payload);
  }

  @Patch()
  public async update(@Body() payload: OptUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
