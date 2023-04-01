import { Owner } from 'src/modules/owners/models/owner.model';
import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Operation } from '../../operations/models/operation.model';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Flat {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  intFlatId: number;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  txtFlatAddress: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
  })
  fltArea: number;

  @ApiProperty()
  @Column({
    type: 'int',
  })
  intCount: number;

  @ApiProperty()
  @Column({
    type: 'int',
  })
  intStorey: number;

  @ApiProperty({
    nullable: true,
    example: {
      intOwnerId: 1,
      txtOwnerSurname: 'Имя',
      txtOwnerSecondName: 'Фамилия',
      txtAddress: 'Адресс',
    },
  })
  @OneToMany(() => Owner, (ow) => ow.flats)
  @JoinColumn()
  intOwnerId: Owner;

  @ApiProperty({
    isArray: true,
    nullable: true,
    example: new Array({
      intOperationId: 1,
      datOperationDate: new Date(),
      txtOperationDescription: 'Описание операции',
    }),
  })
  @OneToMany(() => Operation, (op) => op.flats)
  operations: Operation[];
}
