import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
