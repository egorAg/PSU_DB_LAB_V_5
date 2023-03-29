import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operation } from '../../operations/models/operation.model';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  intWorkerId: number;

  @Column()
  txtWorkerSurname: string;

  @Column()
  txtWorkerName: string;

  @Column({
    nullable: true,
  })
  txtWorkerSecondName?: string;

  @Column()
  txtWorkerSpecialist: string;

  @Column({
    type: 'decimal',
  })
  fltSum: number;

  @OneToMany(() => Operation, (op) => op.intWorkerId)
  @JoinColumn()
  operations: Operation[];
}
