import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  intOwnerId: number;

  @Column()
  txtOwnerSurname: string;

  @Column()
  txtOwnerName: string;

  @Column({
    nullable: true,
  })
  txtOwnerSecondName?: string;

  @Column()
  txtAddress: string;
}
