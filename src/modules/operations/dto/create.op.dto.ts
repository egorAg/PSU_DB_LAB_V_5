import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOpDto {
  @ApiProperty({
    type: Date,
    description: 'Дата операци',
    example: new Date(),
    default: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  datOperationDate?: string;

  @ApiProperty({
    type: String,
    description: 'Описание выполненных работ',
    example: 'Почистил братские трубы',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  txtOperationDescription: string;

  @ApiProperty({
    type: Number,
    description: 'ID работника',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  intWorkerId: number;

  @ApiProperty({
    type: Number,
    description: 'ID квартиры',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  flatId: number;

  @ApiProperty({
    type: Number,
    description: 'Массив с ID типов операции',
    example: [2, 3],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  operationTypeId: number[];
}
