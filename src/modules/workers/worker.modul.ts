import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerController } from './worker.controller';
import { Worker } from './models/worker.model';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [],
})
export class WorkerModule {}
