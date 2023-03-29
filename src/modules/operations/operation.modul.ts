import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './models/operation.model';
import { OpController } from './operation.controller';
import { FlatModule } from '../flats/flat.module';
import { OptModule } from '../operation-types/op.modul';
import { WorkerModule } from '../workers/worker.modul';
import { OperationService } from './operation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operation]),
    FlatModule,
    OptModule,
    WorkerModule,
  ],
  controllers: [OpController],
  providers: [OperationService],
})
export class OperationModule {}
