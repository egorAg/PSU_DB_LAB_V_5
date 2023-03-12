import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationType } from './models/op.model';
import { OptController } from './op.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OperationType])],
  controllers: [OptController],
  providers: [],
})
export class OptModule {}
