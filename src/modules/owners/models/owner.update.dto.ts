import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OwnerUpdateDto {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'ID владельца',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty({
    type: String,
    example: 'Путин',
    description: 'Фамилия владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOwnerSurname?: string;

  @ApiProperty({
    type: String,
    example: 'Владимир',
    description: 'Имя владельца',
    required: false,
  })
  @IsOptional()
  @IsString()
  txtOwnerName?: string;

  @ApiProperty({
    type: String,
    example: 'Владимирович',
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
    required: false,
  })
  @IsOptional()
  @IsString()
  txtAddress?: string;
}
