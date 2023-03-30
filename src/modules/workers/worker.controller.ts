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
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './models/create.worker.dto';
import { UpdateWorkerDto } from './models/update.worker.dto';
import { Worker } from './models/worker.model';

@ApiTags('Работники')
@Controller('worker')
export class WorkerController {
  constructor(private readonly service: WorkerService) {}

  @Get()
  @ApiOperation({
    description: 'Получить работников',
  })
  @ApiOkResponse({
    description: 'Работники',
    type: Worker,
    isArray: true,
  })
  public async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Получить работника',
  })
  @ApiOkResponse({
    description: 'Работник',
    type: Worker,
    isArray: true,
  })
  public async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({
    description: 'Создать работника',
  })
  @ApiOkResponse({
    description: 'Работник',
    type: Worker,
    isArray: true,
  })
  public async create(@Body() payload: CreateWorkerDto) {
    return this.service.create(payload);
  }

  @Patch()
  @ApiOperation({
    description: 'Обновить работника',
  })
  @ApiOkResponse({
    description: 'Работник',
    type: Worker,
    isArray: true,
  })
  public async update(@Body() payload: UpdateWorkerDto) {
    return this.service.update(payload);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Удалить работника',
  })
  public async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
