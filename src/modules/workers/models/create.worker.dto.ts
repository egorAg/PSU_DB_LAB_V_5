import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({
    type: String,
    example: 'Владимиров',
    description: 'Фамилия работника',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerSurname: string;

  @ApiProperty({
    type: String,
    example: 'Владимир',
    description: 'Фамилия работника',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerName: string;

  @ApiProperty({
    type: String,
    example: 'Владимирович',
    description: 'Отчество',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSecondName?: string;

  @ApiProperty({
    type: String,
    example: 'Сварщик',
    description: 'Специальность работника',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerSpecialist: string;

  @ApiProperty({
    type: String,
    example: +new Date(),
    description: 'Заработок работника',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  fltSum: number;
}
