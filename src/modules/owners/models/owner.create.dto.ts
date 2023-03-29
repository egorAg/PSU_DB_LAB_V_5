import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OwnerCreateDto {
  @ApiProperty({
    type: String,
    example: 'Иванов',
    description: 'Фамилия владельца',
  })
  @IsNotEmpty()
  @IsString()
  txtOwnerSurname: string;

  @ApiProperty({
    type: String,
    example: 'Иван',
    description: 'Имя владельца',
  })
  @IsNotEmpty()
  @IsString()
  txtOwnerName: string;

  @ApiProperty({
    type: String,
    example: 'Иванович',
    description: 'Отчество владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOwnerSecondName?: string;

  @ApiProperty({
    type: String,
    example: 'Пушкина Колотушкина 1',
    description: 'Адресс проживания владельца',
  })
  @IsNotEmpty()
  @IsString()
  txtAddress: string;
}
