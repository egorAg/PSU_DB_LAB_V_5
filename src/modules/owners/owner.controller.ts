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
import { OwnerService } from './owner.service';
import { OwnerCreateDto } from './models/owner.create.dto';
import { OwnerUpdateDto } from './models/owner.update.dto';

@ApiTags('Владельцы')
@Controller('owner')
export class OwnerController {
  constructor(private readonly service: OwnerService) {}

  @Get()
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  public async create(@Body() payload: OwnerCreateDto) {
    return this.service.create(payload);
  }

  @Patch(':id')
  public async update(@Body() payload: OwnerUpdateDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
