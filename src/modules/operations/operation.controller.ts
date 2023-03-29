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
import { ApiTags } from '@nestjs/swagger';
import { CreateOpDto } from './dto/create.op.dto';

@ApiTags('Операции')
@Controller('op')
export class OpController {
  constructor(private readonly service: OperationService) {}

  @Post('getAll')
  public async getAll(@Body() filter: OpFilterDto) {
    return this.service.getAll(filter);
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  public async create(@Body() payload: CreateOpDto) {
    return this.service.create(payload);
  }

  @Patch()
  public async update(@Body() payload: any) {
    return payload
    // return this.service.update(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
