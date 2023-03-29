import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationType } from './models/op.model';
import { OptController } from './op.controller';
import { OptService } from './op.service';

@Module({
  imports: [TypeOrmModule.forFeature([OperationType])],
  controllers: [OptController],
  providers: [OptService],
  exports: [OptService],
})
export class OptModule {}
