import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkerDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID работника',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Власов',
    description: 'Фамилия работника',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSurname?: string;

  @ApiProperty({
    type: String,
    example: 'Игорь',
    description: 'Имя работника',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerName?: string;

  @ApiProperty({
    type: String,
    example: 'Анатольевич',
    description: 'Отчество работника',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSecondName?: string;

  @ApiProperty({
    type: String,
    example: 'Сварщик',
    description: 'Специальность работника',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSpecialist: string;

  @ApiProperty({
    type: String,
    example: +new Date(),
    description: 'ЗП работника',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fltSum: number;
}
