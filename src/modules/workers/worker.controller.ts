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
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './models/create.worker.dto';
import { UpdateWorkerDto } from './models/update.worker.dto';

@ApiTags('Рабы')
@Controller('worker')
export class WorkerController {
  constructor(private readonly service: WorkerService) {}

  @Get()
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  public async create(@Body() payload: CreateWorkerDto) {
    return this.service.create(payload);
  }

  @Patch()
  public async update(@Body() payload: UpdateWorkerDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
