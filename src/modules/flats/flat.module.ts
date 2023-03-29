import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatController } from './flat.controller';
import { FlatService } from './flat.service';
import { Flat } from './models/flat.model';
import { OwnerModule } from '../owners/owner.modul';

@Module({
  imports: [TypeOrmModule.forFeature([Flat]), OwnerModule],
  controllers: [FlatController],
  providers: [FlatService],
  exports: [FlatService],
})
export class FlatModule {}
