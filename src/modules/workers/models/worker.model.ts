import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operation } from '../../operations/models/operation.model';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Worker {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  intWorkerId: number;

  @ApiProperty()
  @Column()
  txtWorkerSurname: string;

  @ApiProperty()
  @Column()
  txtWorkerName: string;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  txtWorkerSecondName?: string;

  @ApiProperty()
  @Column()
  txtWorkerSpecialist: string;

  @ApiProperty({
    example: 0.01,
  })
  @Column({
    type: 'decimal',
  })
  fltSum: number;

  @OneToMany(() => Operation, (op) => op.intWorkerId)
  @JoinColumn()
  operations: Operation[];
}
