import { Owner } from 'src/modules/owners/models/owner.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operation } from '../../operations/models/operation.model';

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  intFlatId: number;

  @Column({
    type: 'text',
  })
  txtFlatAddress: string;

  @Column({
    type: 'decimal',
  })
  fltArea: number;

  @Column({
    type: 'int',
  })
  intCount: number;

  @Column({
    type: 'int',
  })
  intStorey: number;

  @OneToOne(() => Owner)
  @JoinColumn()
  intOwnerId: Owner;

  @ManyToOne(() => Operation)
  operations: Operation[];
}
