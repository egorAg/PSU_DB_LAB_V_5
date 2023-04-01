import { Owner } from 'src/modules/owners/models/owner.model';
import {
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Operation } from '../../operations/models/operation.model';
import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from "../../operation-types/models/op.model";

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
  @ManyToMany(() => Owner, (ow) => ow.flats, {
    cascade: false,
  })
  @JoinTable()
  intOwnerId: Owner[];

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
