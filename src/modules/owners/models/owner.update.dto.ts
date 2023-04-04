import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OwnerUpdateDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID владельца',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Иванов',
    description: 'Фамилия владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOwnerSurname?: string;

  @ApiProperty({
    type: String,
    example: 'Иван',
    description: 'Имя владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOwnerName?: string;

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
    example: 'Пушкина Колотушкина 2',
    description: 'Адресс проживания владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtAddress?: string;
}
