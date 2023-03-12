import { Flat } from 'src/modules/flats/models/flat.model';
import { OperationType } from 'src/modules/operation-types/models/op.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Worker } from '../../workers/models/worker.model';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  intOperationId: number;

  @Column()
  datOperationDate: Date;

  @Column()
  txtOperationDescription: string;

  @OneToMany(() => Worker, (worker) => worker.operations)
  @JoinColumn()
  intWorkerId: Worker;

  @OneToMany(() => Flat, (flat) => flat.operations)
  @JoinColumn()
  flats: Flat;

  @ManyToOne(() => OperationType)
  @JoinColumn()
  intOperationTypeId: OperationType[];
}
