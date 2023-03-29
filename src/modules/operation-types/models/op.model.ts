import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
