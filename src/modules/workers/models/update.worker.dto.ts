import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkerDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID раба',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Медведев',
    description: 'Фамилия азаитского раба',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSurname?: string;

  @ApiProperty({
    type: String,
    example: 'Дмитрий',
    description: 'Фамилия уважаемого раба из Азии',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerName?: string;

  @ApiProperty({
    type: String,
    example: 'Анатольевич',
    description: 'Комментарии излишни',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSecondName?: string;

  @ApiProperty({
    type: String,
    example: 'Сварщик',
    description: 'Кто ты по специальности, войн?',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtWorkerSpecialist: string;

  @ApiProperty({
    type: String,
    example: +new Date(),
    description: 'Сколько ты зарабатываешь?',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fltSum: number;
}
