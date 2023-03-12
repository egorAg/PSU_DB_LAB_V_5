import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FlatFilterDto {
  @ApiProperty({
    type: Number,
    description: 'ID владельца квартиры',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerId?: number;

  @ApiProperty({
    type: Number,
    description: 'Размер квартиры ОТ',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fltAreaMin?: number;

  @ApiProperty({
    type: Number,
    description: 'Размер квартиры До',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fltAreaMax?: number;

  @ApiProperty({
    type: Number,
    description: 'Количество жильцов ОТ',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intCountMin?: number;

  @ApiProperty({
    type: Number,
    description: 'Количество жильцов ДО',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intCountMax?: number;

  @ApiProperty({
    type: Number,
    description: 'Этаж ОТ',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intStoreyMin?: number;

  @ApiProperty({
    type: Number,
    description: 'Этаж ДО',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  intStoreyMax?: number;
}
