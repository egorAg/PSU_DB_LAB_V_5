import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OperationType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  intOperationTypeId: number;

  @ApiProperty()
  @Column()
  txtOperationTypeName: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
  })
  fltOperationPrice: number;
}
