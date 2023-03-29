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

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  intOperationId: number;

  @Column({
    default: new Date(),
  })
  datOperationDate: Date;

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
