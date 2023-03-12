import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({
    type: String,
    example: 'Медведев',
    description: 'Фамилия азаитского раба',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerSurname: string;

  @ApiProperty({
    type: String,
    example: 'Дмитрий',
    description: 'Фамилия уважаемого раба из Азии',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerName: string;

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
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtWorkerSpecialist: string;

  @ApiProperty({
    type: String,
    example: +new Date(),
    description: 'Сколько ты зарабатываешь?',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  fltSum: number;
}
