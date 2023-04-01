import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Flat } from '../../flats/models/flat.model';

@Entity()
export class Owner {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  intOwnerId: number;

  @ApiProperty()
  @Column()
  txtOwnerSurname: string;

  @ApiProperty()
  @Column()
  txtOwnerName: string;

  @ApiProperty({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  txtOwnerSecondName?: string;

  @ApiProperty()
  @Column()
  txtAddress: string;

  @ManyToMany(() => Flat, (flat) => flat.intOwnerId, {
    cascade: false,
  })
  flats: Flat[];
}
