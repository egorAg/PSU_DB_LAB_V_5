import { Flat } from 'src/modules/flats/models/flat.model';
import { OperationType } from 'src/modules/operation-types/models/op.model';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Worker } from '../../workers/models/worker.model';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Operation {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  intOperationId: number;

  @ApiProperty()
  @Column({
    default: new Date(),
  })
  datOperationDate: Date;

  @ApiProperty()
  @Column()
  txtOperationDescription: string;

  @ManyToOne(() => Worker, (worker) => worker.operations)
  intWorkerId: Worker;

  @ManyToOne(() => Flat, (flat) => flat.operations)
  flats: Flat;

  @ManyToMany(() => OperationType, undefined, {
    cascade: true,
  })
  @JoinTable()
  intOperationTypeId: OperationType[];
}
