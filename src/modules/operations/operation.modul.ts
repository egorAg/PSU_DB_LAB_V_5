import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './models/operation.model';
import { OpController } from './operation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OpController],
  providers: [],
})
export class OperationModule {}
