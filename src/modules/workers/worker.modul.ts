import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from './worker.controller';
import { Worker } from './models/worker.model';
import { WorkerService } from './worker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService],
})
export class WorkerModule {}
