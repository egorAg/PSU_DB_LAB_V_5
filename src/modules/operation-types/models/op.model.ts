import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Operation } from '../../operations/models/operation.model';

@Entity()
export class OperationType {
  @PrimaryGeneratedColumn()
  intOperationTypeId: number;

  @Column()
  txtOperationTypeName: string;

  @Column({
    type: 'decimal',
  })
  fltOperationPrice: number;

  @ManyToOne(() => Operation, (op) => op.intOperationTypeId)
  operations: Operation[];
}
